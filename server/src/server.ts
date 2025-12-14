import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

// Load environment variables
dotenv.config();

// Import routes
import aiRoutes from './routes/ai.routes';

// Initialize Express app
const app: Express = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server for Socket.io
const httpServer = createServer(app);

// Initialize Socket.io with CORS
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    message: 'CodeLens API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/ai', aiRoutes);

// Store active users per review room
interface ActiveUser {
  userId: string;
  username: string;
  color: string;
}

const activeRooms = new Map<string, Map<string, ActiveUser>>();

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join-review', ({ reviewId, userId, username }) => {
    socket.join(reviewId);
    
    if (!activeRooms.has(reviewId)) {
      activeRooms.set(reviewId, new Map());
    }
    
    const roomUsers = activeRooms.get(reviewId)!;
    const userColor = generateUserColor(roomUsers.size);
    
    roomUsers.set(socket.id, { userId, username, color: userColor });
    
    socket.to(reviewId).emit('user-joined', {
      socketId: socket.id,
      userId,
      username,
      color: userColor,
    });
    
    const activeUsers = Array.from(roomUsers.entries()).map(([sid, user]) => ({
      socketId: sid,
      ...user,
    }));
    
    socket.emit('active-users', activeUsers);
    
    console.log(`User ${username} joined review ${reviewId}`);
  });

  socket.on('cursor-move', ({ reviewId, position }) => {
    socket.to(reviewId).emit('cursor-update', {
      socketId: socket.id,
      position,
    });
  });

  socket.on('code-change', ({ reviewId, code, changes }) => {
    socket.to(reviewId).emit('code-update', {
      socketId: socket.id,
      code,
      changes,
    });
  });

  socket.on('selection-change', ({ reviewId, selection }) => {
    socket.to(reviewId).emit('selection-update', {
      socketId: socket.id,
      selection,
    });
  });

  socket.on('add-comment', ({ reviewId, comment }) => {
    io.to(reviewId).emit('new-comment', comment);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    
    activeRooms.forEach((roomUsers, reviewId) => {
      if (roomUsers.has(socket.id)) {
        const user = roomUsers.get(socket.id);
        roomUsers.delete(socket.id);
        
        socket.to(reviewId).emit('user-left', {
          socketId: socket.id,
          userId: user?.userId,
        });
        
        if (roomUsers.size === 0) {
          activeRooms.delete(reviewId);
        }
      }
    });
  });
});

function generateUserColor(index: number): string {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B739', '#52B788', '#E76F51', '#2A9D8F',
  ];
  return colors[index % colors.length];
}

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📡 WebSocket server is ready`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export { io };