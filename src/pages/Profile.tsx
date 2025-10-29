import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { User, Save, CheckCircle } from 'lucide-react';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    height: 0,
    weight: 0,
    gender: '',
    lifestyle: ''
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        age: user.age || 0,
        height: user.height || 0,
        weight: user.weight || 0,
        gender: user.gender || '',
        lifestyle: user.lifestyle || ''
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'height' || name === 'weight' ? Number(value) : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-gray-900 dark:text-white mb-2">Profile Settings</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Update your personal information for better health recommendations
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            {saved && (
              <div className="mb-6 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <p className="text-emerald-800 dark:text-emerald-300">Profile updated successfully!</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Age
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    min="1"
                    max="150"
                  />
                </div>

                <div>
                  <label htmlFor="height" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Height (cm)
                  </label>
                  <input
                    id="height"
                    name="height"
                    type="number"
                    value={formData.height || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    min="50"
                    max="300"
                  />
                </div>

                <div>
                  <label htmlFor="weight" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    value={formData.weight || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    min="20"
                    max="500"
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="lifestyle" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Lifestyle
                  </label>
                  <select
                    id="lifestyle"
                    name="lifestyle"
                    value={formData.lifestyle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select lifestyle</option>
                    <option value="sedentary">Sedentary (little or no exercise)</option>
                    <option value="light">Lightly Active (1-3 days/week)</option>
                    <option value="moderate">Moderately Active (3-5 days/week)</option>
                    <option value="active">Very Active (6-7 days/week)</option>
                    <option value="extra">Extra Active (physical job + exercise)</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="submit"
                  className="w-full py-4 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>

          {/* Health Stats */}
          {formData.height > 0 && formData.weight > 0 && (
            <div className="mt-8 p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-gray-900 dark:text-white mb-4">Your Health Stats</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">BMI</p>
                  <p className="text-gray-900 dark:text-white">
                    {(formData.weight / Math.pow(formData.height / 100, 2)).toFixed(1)}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    {(() => {
                      const bmi = formData.weight / Math.pow(formData.height / 100, 2);
                      if (bmi < 18.5) return 'Underweight';
                      if (bmi < 25) return 'Normal weight';
                      if (bmi < 30) return 'Overweight';
                      return 'Obese';
                    })()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Ideal Weight Range</p>
                  <p className="text-gray-900 dark:text-white">
                    {(18.5 * Math.pow(formData.height / 100, 2)).toFixed(1)} -{' '}
                    {(24.9 * Math.pow(formData.height / 100, 2)).toFixed(1)} kg
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Activity Level</p>
                  <p className="text-gray-900 dark:text-white capitalize">
                    {formData.lifestyle || 'Not set'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Account Info */}
          <div className="mt-8 p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-gray-900 dark:text-white mb-4">Account Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Email</span>
                <span className="text-gray-900 dark:text-white">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Account ID</span>
                <span className="text-gray-900 dark:text-white font-mono text-sm">{user?.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
