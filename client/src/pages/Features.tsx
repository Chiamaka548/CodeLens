// client/src/pages/Features.tsx
import { useNavigate } from 'react-router-dom';
import { Code2, Users, Zap, Shield, MessageSquare, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Features() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition">
                CodeLens
              </span>
            </a>

            {/* Nav Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900 transition">
                Home
              </a>
              <a href="/features" className="text-indigo-600 font-medium">
                Features
              </a>
              <a href="/pricing" className="text-gray-600 hover:text-gray-900 transition">
                Pricing
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="text-gray-600 hover:text-gray-900 transition font-medium"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="text-gray-600 hover:text-gray-900 transition font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything you need for better code reviews
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for modern development teams who value quality and speed.
              Collaborate in real-time, catch bugs early, and ship with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:border-indigo-300 transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-Time Collaboration
              </h3>
              <p className="text-gray-600">
                Review code together with your team. See live cursors, instant updates,
                and collaborate seamlessly across time zones.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:border-indigo-300 transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Security
              </h3>
              <p className="text-gray-600">
                Automatically detect security vulnerabilities, OWASP Top 10 issues,
                and potential exploits before they reach production.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:border-indigo-300 transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Sub-100ms latency ensures smooth collaboration. No lag,
                no delays—just instant feedback and updates.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:border-indigo-300 transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Smart Comments
              </h3>
              <p className="text-gray-600">
                Thread-based discussions on specific lines of code.
                Keep conversations organized and contextual.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:border-indigo-300 transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Multi-Language Support
              </h3>
              <p className="text-gray-600">
                Support for 18+ programming languages with intelligent
                syntax highlighting and language-specific insights.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:border-indigo-300 transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Analytics Dashboard
              </h3>
              <p className="text-gray-600">
                Track code quality trends, review patterns, and team metrics
                to continuously improve your development process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to improve your code reviews?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join teams who are shipping better code, faster.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition"
          >
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
}