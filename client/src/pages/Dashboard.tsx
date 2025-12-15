// client/src/pages/Dashboard.tsx
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Code2, FileCode, MessageSquare, Sparkles, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center space-x-3 group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/50">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                CodeLens
              </span>
            </motion.a>

            {/* Nav Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/dashboard" className="text-pink-400 font-semibold">
                Dashboard
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Reviews
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Analytics
              </a>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                {user?.user_metadata?.username || user?.email}
              </span>
              <motion.button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.user_metadata?.username || 'Developer'}!
          </h1>
          <p className="text-gray-400">
            Your dashboard is ready. Let's build something great.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:border-pink-500/50 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-600/20 rounded-xl flex items-center justify-center">
                <FileCode className="w-6 h-6 text-pink-400" />
              </div>
              <span className="text-3xl font-bold text-white">0</span>
            </div>
            <h3 className="text-sm font-medium text-gray-400">Total Reviews</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:border-pink-500/50 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-600/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-pink-400" />
              </div>
              <span className="text-3xl font-bold text-white">0</span>
            </div>
            <h3 className="text-sm font-medium text-gray-400">Comments</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:border-pink-500/50 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-600/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-pink-400" />
              </div>
              <span className="text-3xl font-bold text-white">0</span>
            </div>
            <h3 className="text-sm font-medium text-gray-400">AI Insights</h3>
          </motion.div>
        </div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            Features Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Create Code Reviews', desc: 'Upload code and start reviewing' },
              { title: 'Real-Time Collaboration', desc: 'Work together with live updates' },
              { title: 'AI Code Analysis', desc: 'Get intelligent suggestions' },
              { title: 'Analytics Dashboard', desc: 'Track team performance' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start space-x-3 p-4 bg-gray-900/50 rounded-lg border border-gray-700/30 hover:border-pink-500/30 transition-all"
              >
                <div className="w-6 h-6 bg-pink-600/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Code2 className="w-4 h-4 text-pink-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}