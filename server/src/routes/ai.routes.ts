// server/src/routes/ai.routes.ts
import { Router } from 'express';
import { AIController } from '../controllers/ai.controller';

const router = Router();
const aiController = new AIController();

// Analyze code and get insights
router.post('/analyze', (req, res) => aiController.analyzeCode(req, res));

// Get insights for a review
router.get('/insights/:reviewId', (req, res) => aiController.getInsights(req, res));

// Get suggestion for a specific line
router.post('/suggest-line', (req, res) => aiController.suggestLine(req, res));

// Explain code
router.post('/explain', (req, res) => aiController.explainCode(req, res));

export default router;