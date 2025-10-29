import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getReports, calculateAverageHealthScore } from '../utils/healthAnalyzer';
import { HealthReport } from '../utils/healthAnalyzer';
import Navbar from '../components/Navbar';
import {
  Activity,
  TrendingUp,
  FileText,
  Plus,
  Calendar,
  Heart,
  User,
  Scale,
  Eye,
  Calculator
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState<HealthReport[]>([]);
  const [weeklyPlans, setWeeklyPlans] = useState<any[]>([]);
  const [healthTip, setHealthTip] = useState('');
  const [showBMI, setShowBMI] = useState(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  useEffect(() => {
    if (user) {
      const userReports = getReports(user.id);
      setReports(userReports);

      const plans = JSON.parse(localStorage.getItem('weeklyPlans') || '[]');
      const userPlans = plans.filter((p: any) => p.userId === user.id);
      setWeeklyPlans(userPlans);
    }

    // Random health tip
    const tips = [
      '💧 Drink at least 8 glasses of water daily for optimal health',
      '🧘 Practice 10 minutes of meditation daily to reduce stress',
      '🥗 Include more leafy greens in your diet',
      '😴 Aim for 7-9 hours of quality sleep each night',
      '🚶 Take a 30-minute walk every day',
      '🍎 Eat a variety of colorful fruits and vegetables',
      '🧠 Take regular breaks from screen time',
      '💪 Strength training twice a week can improve overall health',
      '🥤 Limit sugary drinks and opt for herbal teas',
      '🌞 Get 15 minutes of sunlight daily for Vitamin D'
    ];
    setHealthTip(tips[Math.floor(Math.random() * tips.length)]);
  }, [user]);

  const avgHealthScore = user ? calculateAverageHealthScore(user.id) : 0;

  // Chart data
  const healthScoreData = reports.slice(0, 10).reverse().map((r, index) => ({
    name: `R${index + 1}`,
    score: r.healthScore,
    date: new Date(r.date).toLocaleDateString()
  }));

  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // convert cm to m
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      return;
    }

    const bmi = w / (h * h);
    let category = '';
    let color = '';

    if (bmi < 16) {
      category = 'Severe Underweight';
      color = 'text-red-600 dark:text-red-400';
    } else if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-orange-600 dark:text-orange-400';
    } else if (bmi < 25) {
      category = 'Normal Weight';
      color = 'text-emerald-600 dark:text-emerald-400';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'text-yellow-600 dark:text-yellow-400';
    } else {
      category = 'Obese';
      color = 'text-red-600 dark:text-red-400';
    }

    setBmiResult({ bmi: parseFloat(bmi.toFixed(1)), category, color });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-gray-900 dark:text-white mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Here's your health overview and progress
            </p>
          </div>

          {/* Health Tip */}
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Daily Health Tip</p>
                <p className="text-white">{healthTip}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {/* Profile Picture Card */}
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center mb-3">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-gray-900 dark:text-white">{user?.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{user?.email}</p>
                <Link
                  to="/profile"
                  className="mt-3 text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            {/* Average Health Score */}
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-gray-900 dark:text-white">Avg Health Score</h3>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{avgHealthScore}/100</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {avgHealthScore >= 80 ? 'Excellent!' : avgHealthScore >= 60 ? 'Good' : 'Needs improvement'}
              </p>
            </div>

            {/* Past Reports */}
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-gray-900 dark:text-white">Total Reports</h3>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{reports.length}</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Health assessments</p>
            </div>

            {/* Weekly Plans */}
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-gray-900 dark:text-white">Weekly Plans</h3>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{weeklyPlans.length}</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Diet & exercise plans</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Health Score Progress Chart */}
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900 dark:text-white">Health Score Progress</h3>
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              {reports.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={healthScoreData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: 'none',
                        borderRadius: '0.5rem',
                        color: '#fff'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  No data yet. Start your first assessment!
                </div>
              )}
            </div>

            {/* BMI Calculator */}
            <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-gray-900 dark:text-white">BMI Calculator</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">Height (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="170"
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm">Weight (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="70"
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  onClick={calculateBMI}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg transition-shadow"
                >
                  Calculate BMI
                </button>

                {bmiResult && (
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {bmiResult.bmi}
                      </div>
                      <div className={`text-lg font-semibold ${bmiResult.color}`}>
                        {bmiResult.category}
                      </div>
                    </div>
                    <div className="mt-4 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <p>• Underweight: BMI {'<'} 18.5</p>
                      <p>• Normal: BMI 18.5 - 24.9</p>
                      <p>• Overweight: BMI 25 - 29.9</p>
                      <p>• Obese: BMI {'≥'} 30</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Past Reports History */}
          <div className="mb-8 p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900 dark:text-white">Past Reports History</h3>
              <Link
                to="/analyze"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg transition-shadow text-sm"
              >
                <Plus className="w-4 h-4" />
                New Assessment
              </Link>
            </div>

            {reports.length > 0 ? (
              <div className="space-y-3">
                {reports.slice(0, 5).map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-emerald-500 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-white font-bold">
                        {report.healthScore}
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white">{new Date(report.date).toLocaleDateString()}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {report.symptoms.length} symptoms detected
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/report/${report.id}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-500 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Report
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">No reports yet</p>
                <Link
                  to="/analyze"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg transition-shadow"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Assessment
                </Link>
              </div>
            )}
          </div>

          {/* Past Weekly Plans */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900 dark:text-white">Past Weekly Plans</h3>
            </div>

            {weeklyPlans.length > 0 ? (
              <div className="space-y-3">
                {weeklyPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white">
                          Week of {new Date(plan.createdDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {plan.weekPlan.length} days planned
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No weekly plans yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
