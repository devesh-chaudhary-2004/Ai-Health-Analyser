import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { healthReportAPI } from '../services/api';
import { Sparkles, AlertCircle, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function HealthAnalyzer() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: '',
    duration: '',
    severity: '',
    frequency: '',
    triggers: '',
    existingConditions: '',
    medications: '',
    lifestyle: '',
    dietPreference: '' // vegetarian or non-vegetarian
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleAnalyze = async () => {
    if (!user) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      // Combine all form data into symptoms string
      const symptoms = `
Description: ${formData.description}
Duration: ${formData.duration}
Severity: ${formData.severity}
Frequency: ${formData.frequency}
Triggers: ${formData.triggers}
Existing Conditions: ${formData.existingConditions}
Current Medications: ${formData.medications}
Lifestyle: ${formData.lifestyle}
      `.trim();

      const response = await healthReportAPI.generateAnalysis(
        user.id,
        symptoms,
        'report',
        {
          duration: formData.duration,
          severity: formData.severity,
          frequency: formData.frequency,
          worseCondition: formData.triggers,
          existingConditions: formData.existingConditions,
          medications: formData.medications,
          lifestyle: formData.lifestyle,
          dietPreference: formData.dietPreference // Add diet preference
        }
      );

      if (response.success && response.data?.report) {
        toast.success('Health report generated successfully!');
        setLoading(false);
        navigate(`/report/${response.data.report._id || response.data.report.id}`);
      } else {
        throw new Error('Failed to generate report');
      }
    } catch (error: any) {
      console.error('Error generating report:', error);
      toast.error(error.response?.data?.error || 'Failed to generate health report. Please try again.');
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.description.trim().length > 0;
    if (step === 2) return formData.duration && formData.severity;
    if (step === 3) return formData.frequency.trim().length > 0;
    if (step === 4) return formData.dietPreference !== ''; // Require diet preference
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 mb-4">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Health Assessment</span>
            </div>
            <h1 className="text-gray-900 dark:text-white mb-2">Health Assessment</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Complete this detailed assessment to receive comprehensive AI-generated health insights
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    s <= step 
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    {s}
                  </div>
                  {s < 4 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      s < step ? 'bg-gradient-to-r from-emerald-500 to-cyan-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Symptoms</span>
              <span>Duration</span>
              <span>Details</span>
              <span>Background & Diet</span>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            {/* Step 1: Description */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-gray-900 dark:text-white mb-2">Describe Your Symptoms</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Please provide a detailed description of what you're experiencing
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    What symptoms are you experiencing? *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    placeholder="Example: I've been experiencing constant headaches, especially in the afternoon. I also feel tired and have difficulty concentrating..."
                  />
                </div>
              </div>
            )}

            {/* Step 2: Duration and Severity */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-gray-900 dark:text-white mb-2">Duration & Severity</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Help us understand how long this has been happening and how severe it is
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    How long have you been experiencing these symptoms? *
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select duration</option>
                    <option value="less-than-day">Less than a day</option>
                    <option value="1-3-days">1-3 days</option>
                    <option value="4-7-days">4-7 days</option>
                    <option value="1-2-weeks">1-2 weeks</option>
                    <option value="2-4-weeks">2-4 weeks</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="more-than-6-months">More than 6 months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    How severe are your symptoms? *
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {['Mild', 'Moderate', 'Severe'].map((severity) => (
                      <button
                        key={severity}
                        type="button"
                        onClick={() => setFormData({ ...formData, severity })}
                        className={`px-6 py-4 rounded-lg border-2 transition-all ${
                          formData.severity === severity
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                            : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-300'
                        }`}
                      >
                        {severity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Frequency and Triggers */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-gray-900 dark:text-white mb-2">Frequency & Triggers</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Tell us more about when and how often these symptoms occur
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    How often do you experience these symptoms? *
                  </label>
                  <textarea
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    placeholder="Example: Daily in the afternoon, or several times a week..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Are there any triggers or situations that make it worse?
                  </label>
                  <textarea
                    value={formData.triggers}
                    onChange={(e) => setFormData({ ...formData, triggers: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    placeholder="Example: Stress, certain foods, physical activity..."
                  />
                </div>
              </div>
            )}

            {/* Step 4: Medical Background */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-gray-900 dark:text-white mb-2">Medical Background & Diet Preference</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Optional information to help us provide more personalized recommendations
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    What is your diet preference? *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, dietPreference: 'vegetarian' })}
                      className={`px-6 py-4 rounded-lg border-2 transition-all ${
                        formData.dietPreference === 'vegetarian'
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-300'
                      }`}
                    >
                      🌱 Vegetarian
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, dietPreference: 'non-vegetarian' })}
                      className={`px-6 py-4 rounded-lg border-2 transition-all ${
                        formData.dietPreference === 'non-vegetarian'
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-300'
                      }`}
                    >
                      🍖 Non-Vegetarian
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    This helps us recommend appropriate food items in your diet plan
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Do you have any existing medical conditions?
                  </label>
                  <textarea
                    value={formData.existingConditions}
                    onChange={(e) => setFormData({ ...formData, existingConditions: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    placeholder="Example: Diabetes, hypertension, allergies..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Are you currently taking any medications?
                  </label>
                  <textarea
                    value={formData.medications}
                    onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    placeholder="List any medications or supplements..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Describe your lifestyle (diet, exercise, sleep, stress levels)
                  </label>
                  <textarea
                    value={formData.lifestyle}
                    onChange={(e) => setFormData({ ...formData, lifestyle: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    placeholder="Example: Sedentary job, irregular sleep pattern, high stress..."
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>
              )}

              {step < 4 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Health Report
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Disclaimer */}
            <div className="mt-6 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-900 dark:text-yellow-200 text-sm">
                  <strong>Important:</strong> This AI analysis is for informational purposes only. Always consult a qualified healthcare provider for medical concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
