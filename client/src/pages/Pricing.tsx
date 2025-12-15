// client/src/pages/Pricing.tsx
import { useNavigate } from 'react-router-dom';
import { Code2, Check, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Pricing() {
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
            <a href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition">
                CodeLens
              </span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900 transition">
                Home
              </a>
              <a href="/features" className="text-gray-600 hover:text-gray-900 transition">
                Features
              </a>
              <a href="/pricing" className="text-indigo-600 font-medium">
                Pricing
              </a>
            </div>

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

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600">
              Choose the plan that's right for your team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Up to 5 reviews/month</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Basic AI insights</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">2 team members</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/signup')}
                className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-indigo-600 rounded-lg p-8 border-2 border-indigo-600 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$29</span>
                <span className="text-indigo-200">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Unlimited reviews</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Advanced AI insights</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white">10 team members</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white">Priority support</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/signup')}
                className="w-full px-4 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Unlimited team members</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Custom integrations</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Dedicated support</span>
                </li>
              </ul>
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition font-medium">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}