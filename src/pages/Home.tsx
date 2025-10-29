import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Activity, Brain, Heart, TrendingUp, Shield, Sparkles, MessageCircle, FileText, Apple, Stethoscope } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    if (user) {
      navigate('/analyze');
    } else {
      navigate('/login');
    }
  };

  const services = [
    {
      icon: Brain,
      title: 'AI Health Analysis',
      description: 'Get comprehensive health reports powered by advanced AI technology that analyzes your symptoms and provides detailed insights.'
    },
    {
      icon: FileText,
      title: 'Detailed Reports',
      description: 'Receive detailed reports with symptoms analysis, possible causes, prevention tips, recommended medicines, yoga, exercises, and natural remedies.'
    },
    {
      icon: Apple,
      title: 'Personalized Diet Plans',
      description: 'Get weekly diet plans customized to your health condition with daily exercises, medicines, and meal recommendations to achieve optimal results.'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Track your daily progress, monitor your health score improvements, and get personalized suggestions for better health outcomes.'
    },
    {
      icon: Heart,
      title: 'Holistic Wellness',
      description: 'Complete wellness approach combining modern medicine with yoga, natural remedies, and lifestyle modifications for sustainable health.'
    },
    {
      icon: Stethoscope,
      title: 'BMI & Health Metrics',
      description: 'Calculate your BMI, track past reports, monitor average health scores, and maintain a complete health history dashboard.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Health Analysis</span>
              </div>
              
              <h1 className="text-gray-900 dark:text-white">
                Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">AI Health</span> & Wellness Analyzer
              </h1>
              
              <p className="text-gray-600 dark:text-gray-300">
                Enter your symptoms and get comprehensive AI-generated health reports with personalized recommendations for diet, yoga, lifestyle, and medical remedies.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleStartAssessment}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Start Assessment
                </button>
                <Link
                  to="/chatbot"
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      navigate('/login');
                    }
                  }}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  AI Chatbot
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Trusted by 10,000+ users</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1668417421159-e6dacfad76a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMG1lZGljYWx8ZW58MXx8fHwxNzYxNjcyNjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Health and wellness"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 dark:text-white mb-4">
              Our Services & Features
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive health analysis and wellness solutions powered by AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative text-center space-y-6">
              <h2 className="text-white">
                Ready to Take Control of Your Health?
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto">
                Join thousands of users who are improving their health with AI-powered insights
              </p>
              <button
                onClick={handleStartAssessment}
                className="inline-block px-8 py-4 rounded-xl bg-white text-emerald-600 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Start Your Assessment Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4 bg-yellow-50 dark:bg-yellow-900/20 border-t border-yellow-200 dark:border-yellow-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <p className="text-yellow-900 dark:text-yellow-200">
                <strong>Medical Disclaimer:</strong> This AI-powered tool is designed for informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this platform. For reliable and more accurate results, please consult with a licensed doctor or healthcare professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span>Health Analyzer</span>
              </div>
              <p className="text-gray-400">
                AI-powered health and wellness analysis platform for comprehensive health insights.
              </p>
            </div>
            
            <div>
              <h3 className="mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                <li><Link to="/feedback" className="hover:text-emerald-400 transition-colors">Feedback</Link></li>
                {user && <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</Link></li>}
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>AI Health Analysis</li>
                <li>Diet Planning</li>
                <li>Progress Tracking</li>
                <li>BMI Calculator</li>
                <li>24/7 AI Chatbot</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2025 AI Health & Wellness Analyzer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
