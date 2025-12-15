import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Code2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 relative overflow-hidden">
      <motion.div className="absolute top-0 left-0 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px]" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3],}} transition={{ duration: 8, repeat: Infinity,}}/>
      <motion.div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px]" animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}/>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-md w-full bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-8 relative z-10">
        <motion.button onClick={() => navigate('/')} className="flex items-center space-x-2 text-gray-400 hover:text-pink-400 mb-6 transition-colors" whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
          <ArrowLeft className="w-5 h-5"/>
          <span className="text-sm font-semibold">Back to Home</span>
        </motion.button>

        {/* Logo/Header */}
        <div className="text-center mb-8">
          <motion.div className="inline-flex items-center justify-center w-16 h-16 bg-pink-600 rounded-2xl mb-4 shadow-lg shadow-pink-500/50" whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
            <Code2 className="w-8 h-8 text-white"/>
          </motion.div>
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-2">Sign in to continue to CodeLens</p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl">
            <p className="text-sm text-red-400 font-medium">{error}</p>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
              Email
            </label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition text-white placeholder-gray-500" placeholder="you@example.com"/>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition pr-12 text-white placeholder-gray-500" placeholder="••••••••"/>
              <motion.button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-400 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {showPassword ? (
                  <EyeOff className="w-5 h-5"/>
                ) : (
                  <Eye className="w-5 h-5"/>
                )}
              </motion.button>
            </div>
          </motion.div>

          <motion.button type="submit" disabled={loading} className="w-full bg-pink-600 text-white py-4 rounded-xl font-semibold text-lg shadow-xl shadow-pink-500/30 hover:bg-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <motion.p className="mt-6 text-center text-sm text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          Don't have an account?{' '}
          <a href="/signup" className="font-bold text-pink-400 hover:text-pink-300 transition-colors">
            Sign up
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}