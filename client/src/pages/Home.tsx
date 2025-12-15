import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { Code2, LogOut } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Floating particles animation variants
  const floatingVariants = {
    animate: {
      y: [0, -30, 0],
      x: [0, 15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants2 = {
    animate: {
      y: [0, 30, 0],
      x: [0, -20, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(236,72,153,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <motion.div variants={floatingVariants} animate="animate" className="absolute top-20 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px]"/>
        <motion.div variants={floatingVariants2} animate="animate" className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px]"/>
        <motion.div variants={floatingVariants} animate="animate" style={{ animationDelay: '2s' }} className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-400/15 rounded-full blur-[80px]"/>
        <motion.div animate={{rotate: [0, 360],}} transition={{duration: 40, repeat: Infinity, ease: "linear"}} className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] border border-pink-500/10 rounded-full"/>
        <motion.div animate={{rotate: [360, 0],}} transition={{duration: 50, repeat: Infinity, ease: "linear"}} className="absolute -bottom-1/2 -left-1/2 w-[1200px] h-[1200px] border border-pink-500/10 rounded-full"/>
      </div>
      <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.a href="/" className="flex items-center space-x-3 group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }} className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/50">
                <Code2 className="w-6 h-6 text-white"/>
              </motion.div>
              <span className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                CodeLens
              </span>
            </motion.a>

            <div className="hidden md:flex items-center space-x-8">
              <motion.a href="/" className="text-pink-400 font-semibold relative" whileHover={{ y: -2 }}>
                Home
                <motion.div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-500" layoutId="underline"/>
              </motion.a>
              <motion.a href="/features" className="text-gray-400 hover:text-white transition-colors font-medium" whileHover={{ y: -2 }}>
                Features
              </motion.a>
              <motion.a href="/pricing" className="text-gray-400 hover:text-white transition-colors font-medium" whileHover={{ y: -2 }}>
                Pricing
              </motion.a>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <motion.button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white transition-colors font-medium" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Dashboard
                  </motion.button>
                  <motion.button onClick={handleSignOut} className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <LogOut className="w-4 h-4"/>
                    <span>Sign Out</span>
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button onClick={() => navigate('/login')} className="text-gray-400 hover:text-white transition-colors font-medium" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Sign In
                  </motion.button>
                  <motion.button onClick={() => navigate('/signup')} className="px-5 py-2.5 bg-pink-600 text-white rounded-lg font-semibold shadow-lg shadow-pink-500/30 hover:bg-pink-500 transition-all"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)"
                    }} whileTap={{ scale: 0.95 }}>
                    Get Started
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      <motion.section style={{ opacity, scale }} className="flex-1 flex items-center justify-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-7xl md:text-8xl font-bold text-white mb-6 leading-tight">
                <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="inline-block">
                  Real-Time
                </motion.span>{' '}
                <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="inline-block">
                  Code
                </motion.span>{' '}
                <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="inline-block">
                  Reviews
                </motion.span>
                <br />
              </motion.h1>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }} className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Collaborate with your team in real-time, catch bugs before they ship,
              and improve code quality with intelligent AI insights.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }} className="flex justify-center">
              <motion.button onClick={() => navigate('/signup')} className="relative px-12 py-5 bg-pink-600 text-white rounded-xl font-bold text-lg shadow-2xl shadow-pink-500/50 overflow-hidden group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <motion.div className="absolute inset-0 bg-pink-500" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }}/>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Start Reviewing Code</span>
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    →
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="mt-24 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { value: '100+', label: 'Reviews Daily', delay: 0 },
                { value: '50ms', label: 'Response Time', delay: 0.2 },
                { value: '99.9%', label: 'Uptime', delay: 0.4 },
              ].map((stat, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.7 + stat.delay }} whileHover={{ y: -5, scale: 1.05 }} className="relative group">
                  <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 shadow-lg hover:shadow-pink-500/20">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 1.9 + stat.delay, type: "spring" }} className="text-5xl font-bold text-white mb-2">
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                  </div>
                  
                  <motion.div className="absolute inset-0 bg-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"/>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 bg-pink-400 rounded-full" initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, repeatType: "reverse", }}/>
        ))}
      </div>
    </div>
  );
}