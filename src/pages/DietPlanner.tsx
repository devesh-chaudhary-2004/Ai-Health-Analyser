import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getReportById } from '../utils/healthAnalyzer';
import Navbar from '../components/Navbar';
import { Apple, Dumbbell, Pill, Coffee, Sun, Moon, Download, CheckCircle, TrendingUp, Calendar } from 'lucide-react';
import jsPDF from 'jspdf';
import { toast } from 'sonner@2.0.3';

interface DayPlan {
  day: string;
  date?: string;
  diet: string[];
  exercises: string[];
  medicines: string[];
  notes: string;
  progress?: number;
}

interface WeeklyPlan {
  id: string;
  reportId: string;
  userId: string;
  createdDate: string;
  weekPlan: DayPlan[];
}

export default function DietPlanner() {
  const { reportId } = useParams<{ reportId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [progressData, setProgressData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reportId) {
      generatePlanFromReport();
    }
  }, [reportId]);

  const generatePlanFromReport = () => {
    if (!reportId || !user) return;

    setLoading(true);
    setTimeout(() => {
      const report = getReportById(reportId);
      if (!report) {
        toast.error('Report not found');
        navigate('/dashboard');
        return;
      }

      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const weekPlan: DayPlan[] = days.map((day, index) => ({
        day,
        date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString(),
        diet: generateDailyDiet(report.foodsToEat, day),
        exercises: generateDailyExercises(report.exercises, report.yoga, day),
        medicines: report.medicines.slice(0, 3),
        notes: `Focus on ${report.prevention[index % report.prevention.length]}`,
        progress: 0
      }));

      const plan: WeeklyPlan = {
        id: Date.now().toString(),
        reportId: reportId,
        userId: user.id,
        createdDate: new Date().toISOString(),
        weekPlan
      };

      setWeeklyPlan(plan);
      setLoading(false);
    }, 1500);
  };

  const generateDailyDiet = (foods: string[], day: string): string[] => {
    const meals = [
      `Breakfast: ${foods[0] || 'Oatmeal'} with ${foods[1] || 'fruits'}`,
      `Mid-Morning Snack: ${foods[2] || 'Nuts and seeds'}`,
      `Lunch: ${foods[3] || 'Lean protein'} with ${foods[4] || 'vegetables'} and whole grains`,
      `Evening Snack: ${foods[5] || 'Yogurt'} or ${foods[6] || 'smoothie'}`,
      `Dinner: ${foods[Math.floor(Math.random() * foods.length)]} with salad`,
      'Stay hydrated: Drink 8-10 glasses of water'
    ];
    return meals;
  };

  const generateDailyExercises = (exercises: string[], yoga: string[], day: string): string[] => {
    const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(day);
    return [
      exercises[dayIndex % exercises.length] || 'Walking 30 minutes',
      exercises[(dayIndex + 1) % exercises.length] || 'Light stretching',
      yoga[dayIndex % yoga.length] || 'Basic yoga poses',
      'Deep breathing exercises - 10 minutes'
    ];
  };

  const handleUpdateProgress = (dayIndex: number, progress: number) => {
    if (!weeklyPlan) return;
    
    const updatedPlan = { ...weeklyPlan };
    updatedPlan.weekPlan[dayIndex].progress = progress;
    setWeeklyPlan(updatedPlan);
    setProgressData({ ...progressData, [dayIndex]: progress });
    
    toast.success(`Progress updated for ${updatedPlan.weekPlan[dayIndex].day}`);
  };

  const handleSavePlan = () => {
    if (!weeklyPlan) return;

    const plans = JSON.parse(localStorage.getItem('weeklyPlans') || '[]');
    plans.push(weeklyPlan);
    localStorage.setItem('weeklyPlans', JSON.stringify(plans));
    
    toast.success('Weekly plan saved to dashboard!');
    setTimeout(() => navigate('/dashboard'), 1000);
  };

  const calculateWeeklyAverage = (): number => {
    if (!weeklyPlan) return 0;
    const completed = weeklyPlan.weekPlan.filter(d => d.progress && d.progress > 0);
    if (completed.length === 0) return 0;
    const sum = completed.reduce((acc, d) => acc + (d.progress || 0), 0);
    return Math.round(sum / completed.length);
  };

  const handleDownloadPDF = () => {
    if (!weeklyPlan) return;

    const doc = new jsPDF();
    const margin = 20;
    let yPos = 20;

    doc.setFontSize(20);
    doc.setTextColor(16, 185, 129);
    doc.text('Weekly Diet & Exercise Plan', margin, yPos);
    yPos += 15;

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Created: ${new Date(weeklyPlan.createdDate).toLocaleDateString()}`, margin, yPos);
    yPos += 10;

    weeklyPlan.weekPlan.forEach((dayPlan) => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(14);
      doc.setTextColor(16, 185, 129);
      doc.text(dayPlan.day, margin, yPos);
      yPos += 8;

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      
      doc.text('Diet:', margin, yPos);
      yPos += 6;
      dayPlan.diet.forEach((item) => {
        doc.text(`• ${item}`, margin + 5, yPos);
        yPos += 5;
      });

      yPos += 3;
      doc.text('Exercises:', margin, yPos);
      yPos += 6;
      dayPlan.exercises.forEach((item) => {
        doc.text(`• ${item}`, margin + 5, yPos);
        yPos += 5;
      });

      yPos += 10;
    });

    doc.save('Weekly-Health-Plan.pdf');
    toast.success('Plan downloaded successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />
        <div className="pt-32 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Generating your personalized plan...</p>
        </div>
      </div>
    );
  }

  if (!weeklyPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />
        <div className="pt-32 px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">No plan generated yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-gray-900 dark:text-white mb-2">Your Weekly Health Plan</h1>
                <p className="text-gray-600 dark:text-gray-300">Follow this personalized plan to achieve optimal health results</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowProgress(!showProgress)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                >
                  <TrendingUp className="w-5 h-5" />
                  {showProgress ? 'Hide Progress' : 'Track Progress'}
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-xl transition-shadow"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                <button
                  onClick={handleSavePlan}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-xl transition-shadow"
                >
                  <CheckCircle className="w-5 h-5" />
                  Save to Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* Weekly Average Progress */}
          {showProgress && (
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-white mb-2">Weekly Average Progress</h2>
                  <p className="text-white/90">Track your daily completion to see improvements</p>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold">{calculateWeeklyAverage()}%</div>
                  <div className="text-white/90">completion</div>
                </div>
              </div>
            </div>
          )}

          {/* Daily Plans */}
          <div className="space-y-6">
            {weeklyPlan.weekPlan.map((dayPlan, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white">{dayPlan.day}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{dayPlan.date}</p>
                    </div>
                  </div>

                  {showProgress && (
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={dayPlan.progress || 0}
                        onChange={(e) => handleUpdateProgress(index, parseInt(e.target.value))}
                        className="w-32"
                      />
                      <span className="text-gray-900 dark:text-white font-bold w-12">{dayPlan.progress || 0}%</span>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Diet */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Apple className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <h4 className="text-gray-900 dark:text-white">Diet Plan</h4>
                    </div>
                    <ul className="space-y-2">
                      {dayPlan.diet.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exercises */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Dumbbell className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      <h4 className="text-gray-900 dark:text-white">Exercises</h4>
                    </div>
                    <ul className="space-y-2">
                      {dayPlan.exercises.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                          <span className="text-cyan-500 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Medicines & Notes */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Pill className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h4 className="text-gray-900 dark:text-white">Medicines</h4>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {dayPlan.medicines.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                      <p className="text-yellow-900 dark:text-yellow-200 text-sm">{dayPlan.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Summary */}
          {showProgress && (
            <div className="mt-8 p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-gray-900 dark:text-white mb-4">Progress Summary & Suggestions</h3>
              <div className="space-y-3">
                {calculateWeeklyAverage() >= 80 && (
                  <p className="text-emerald-600 dark:text-emerald-400">🎉 Excellent work! You're maintaining great consistency. Keep it up!</p>
                )}
                {calculateWeeklyAverage() >= 50 && calculateWeeklyAverage() < 80 && (
                  <div>
                    <p className="text-cyan-600 dark:text-cyan-400 mb-2">👍 Good progress! Here are some tips to improve:</p>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                      <li>• Try to be more consistent with daily routines</li>
                      <li>• Focus on completing at least one full category each day</li>
                      <li>• Set reminders for meals and exercise times</li>
                    </ul>
                  </div>
                )}
                {calculateWeeklyAverage() < 50 && calculateWeeklyAverage() > 0 && (
                  <div>
                    <p className="text-yellow-600 dark:text-yellow-400 mb-2">💪 Room for improvement! Try these suggestions:</p>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                      <li>• Start with small, achievable goals</li>
                      <li>• Focus on one aspect at a time (diet, then exercise)</li>
                      <li>• Seek support from family or friends</li>
                      <li>• Remember: consistency is more important than perfection</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <p className="text-yellow-900 dark:text-yellow-200 text-sm">
              <strong>Note:</strong> This plan is AI-generated based on your health report. Please consult with healthcare professionals before making significant changes to your diet or exercise routine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
