export interface HealthReport {
  id: string;
  userId: string;
  date: string;
  symptoms: string[];
  causes: string[];
  deficiencies: string[];
  prevention: string[];
  cure: string[];
  medicines: string[];
  yoga: string[];
  exercises: string[];
  foodsToEat: string[];
  foodsToAvoid: string[];
  thingsToFollow: string[];
  thingsToAvoid: string[];
  naturalRemedies: string[];
  healthScore: number;
  summary: string;
  rawInput: string;
}

export function analyzeHealth(symptomsText: string, userId: string): HealthReport {
  const symptoms = symptomsText.toLowerCase();
  
  // Mock AI analysis - in production, integrate with OpenAI API or similar
  const report: HealthReport = {
    id: Date.now().toString(),
    userId,
    date: new Date().toISOString(),
    symptoms: [],
    causes: [],
    deficiencies: [],
    prevention: [],
    cure: [],
    medicines: [],
    yoga: [],
    exercises: [],
    foodsToEat: [],
    foodsToAvoid: [],
    thingsToFollow: [],
    thingsToAvoid: [],
    naturalRemedies: [],
    healthScore: 75,
    summary: '',
    rawInput: symptomsText
  };

  // Headache analysis
  if (symptoms.includes('headache') || symptoms.includes('head pain')) {
    report.symptoms.push('Persistent Headache', 'Head pain and pressure', 'Possible tension headache');
    report.causes.push(
      'Dehydration and insufficient fluid intake',
      'Stress and mental tension',
      'Eye strain from prolonged screen exposure',
      'Poor posture and neck tension',
      'Sleep deprivation or irregular sleep patterns',
      'Caffeine withdrawal'
    );
    report.deficiencies.push('Magnesium', 'Vitamin B2 (Riboflavin)', 'Vitamin D', 'Omega-3 fatty acids', 'Potassium');
    report.prevention.push(
      'Stay hydrated - drink 8-10 glasses of water daily',
      'Take regular breaks from screen time (20-20-20 rule)',
      'Practice stress management and relaxation techniques',
      'Maintain consistent sleep schedule (7-8 hours)',
      'Exercise regularly to improve circulation',
      'Maintain proper posture while working'
    );
    report.cure.push(
      'Rest in a dark, quiet room',
      'Apply cold compress to forehead for 15-20 minutes',
      'Practice deep breathing and relaxation exercises',
      'Gentle neck and shoulder massage',
      'Stay hydrated and eat regular meals',
      'Avoid triggers like bright lights and loud noises'
    );
    report.medicines.push(
      'Ibuprofen (400mg) as needed (consult doctor)',
      'Acetaminophen (Paracetamol) 500mg',
      'Magnesium supplements (400mg daily)',
      'Vitamin B2 (Riboflavin) 400mg',
      'Aspirin for occasional headaches',
      '⚠️ Consult healthcare provider before starting any medication'
    );
    report.yoga.push(
      'Child\'s Pose (Balasana) - 2 minutes',
      'Seated Forward Bend (Paschimottanasana)',
      'Legs-Up-The-Wall Pose (Viparita Karani) - 5 minutes',
      'Corpse Pose (Shavasana) - 10 minutes',
      'Neck Rolls and Gentle Neck Stretches',
      'Pranayama breathing exercises'
    );
    report.exercises.push(
      'Light walking for 20-30 minutes daily',
      'Neck and shoulder stretches',
      'Eye exercises and focusing techniques',
      'Gentle aerobic exercises',
      'Swimming or water exercises',
      'Avoid vigorous exercise during headache episodes'
    );
    report.foodsToEat.push(
      'Leafy greens (spinach, kale)',
      'Nuts and seeds (almonds, pumpkin seeds, flaxseeds)',
      'Fatty fish (salmon, mackerel, sardines)',
      'Bananas (rich in potassium)',
      'Watermelon and hydrating fruits',
      'Ginger tea and herbal teas',
      'Whole grains',
      'Yogurt and probiotic foods'
    );
    report.foodsToAvoid.push(
      'Processed and packaged foods',
      'Excessive caffeine and energy drinks',
      'Alcohol and wine (especially red wine)',
      'Aged cheeses',
      'Artificial sweeteners (aspartame)',
      'MSG and food additives',
      'Chocolate (for some individuals)',
      'Nitrates and nitrites in processed meats'
    );
    report.thingsToFollow.push(
      'Maintain a consistent daily routine',
      'Practice stress management daily',
      'Keep a headache diary to identify triggers',
      'Ensure adequate hydration throughout the day',
      'Get regular, quality sleep',
      'Practice good posture',
      'Take regular screen breaks',
      'Create a relaxing bedtime routine'
    );
    report.thingsToAvoid.push(
      'Skipping meals or fasting',
      'Excessive screen time without breaks',
      'Loud noises and bright lights',
      'Stressful situations when possible',
      'Irregular sleep patterns',
      'Dehydration',
      'Overexertion and physical strain',
      'Known personal triggers'
    );
    report.naturalRemedies.push(
      'Ginger tea - anti-inflammatory properties',
      'Peppermint oil applied to temples',
      'Lavender essential oil aromatherapy',
      'Feverfew herb supplements',
      'Butterbur root extract',
      'Chamomile tea for relaxation',
      'Rosemary essential oil',
      'Apple cider vinegar diluted in water',
      'Cold compress with lavender'
    );
  }

  // Eye pain/strain analysis
  if (symptoms.includes('eye') || symptoms.includes('vision')) {
    report.symptoms.push('Eye strain and discomfort', 'Visual fatigue', 'Dry or irritated eyes');
    report.causes.push(
      'Prolonged digital screen exposure',
      'Poor lighting conditions',
      'Incorrect glasses or contact lens prescription',
      'Dry eye syndrome',
      'Digital eye strain (Computer Vision Syndrome)',
      'Insufficient blinking while using screens',
      'Uncorrected vision problems'
    );
    report.deficiencies.push('Vitamin A', 'Vitamin C', 'Vitamin E', 'Zinc', 'Omega-3 fatty acids', 'Lutein and Zeaxanthin');
    report.prevention.push(
      'Follow 20-20-20 rule (every 20 min, look 20 feet away for 20 seconds)',
      'Ensure proper lighting when reading or working',
      'Adjust screen brightness and contrast to comfortable levels',
      'Use blue light filters on devices',
      'Blink frequently to keep eyes moist',
      'Position screen at arm\'s length and slightly below eye level',
      'Regular eye examinations'
    );
    report.cure.push(
      'Apply warm compress to eyes for 10 minutes',
      'Use artificial tears for dryness',
      'Practice eye exercises and focusing techniques',
      'Reduce screen time and take frequent breaks',
      'Get adequate sleep (7-8 hours)',
      'Keep eyes hydrated',
      'Adjust work environment ergonomics'
    );
    report.medicines.push(
      'Artificial tears eye drops (preservative-free)',
      'Lubricating eye drops',
      'Omega-3 supplements',
      'Vitamin A supplements',
      'Antihistamine eye drops (if allergies present)',
      '⚠️ Consult an ophthalmologist for persistent issues'
    );
    report.yoga.push(
      'Eye Rotations (clockwise and counterclockwise)',
      'Palming (rub hands together and place on closed eyes)',
      'Near and Far Focusing exercises',
      'Trataka (candle gazing meditation)',
      'Shavasana (complete relaxation)',
      'Blinking exercises'
    );
    report.exercises.push(
      'Eye rolling exercises',
      'Focus shifting exercises',
      'Figure-8 eye movements',
      'Pencil push-ups for convergence',
      'Zooming exercises',
      'Regular walks outdoors for distance vision'
    );
    report.foodsToEat.push(
      'Carrots (rich in beta-carotene)',
      'Sweet potatoes',
      'Leafy greens (spinach, kale)',
      'Citrus fruits (oranges, lemons)',
      'Eggs (lutein and zeaxanthin)',
      'Fatty fish (salmon, tuna)',
      'Berries (blueberries, blackberries)',
      'Nuts (almonds, walnuts)'
    );
    report.foodsToAvoid.push(
      'Excessive sugar and refined carbohydrates',
      'Processed snacks and junk food',
      'Trans fats',
      'Excessive salt',
      'Foods high in saturated fats'
    );
    report.thingsToFollow.push(
      'Regular eye checkups annually',
      'Proper screen ergonomics',
      'Adequate lighting in workspace',
      'Frequent blinking exercises',
      'Outdoor time for natural light exposure',
      'Proper sleep hygiene',
      'Hydration throughout the day'
    );
    report.thingsToAvoid.push(
      'Prolonged screen time without breaks',
      'Reading in dim light',
      'Rubbing eyes excessively',
      'Ignoring vision problems',
      'Using outdated prescriptions',
      'Smoking (damages blood vessels in eyes)',
      'Dehydration'
    );
    report.naturalRemedies.push(
      'Rose water eye wash',
      'Cucumber slices on closed eyes',
      'Cold green tea bags compress',
      'Aloe vera gel around eyes',
      'Triphala eye wash (Ayurvedic)',
      'Castor oil drops (food-grade)',
      'Fennel seed tea eye wash',
      'Chamomile tea compress'
    );
  }

  // Fatigue/tiredness
  if (symptoms.includes('tired') || symptoms.includes('fatigue') || symptoms.includes('weak')) {
    report.symptoms.push('Chronic fatigue', 'Low energy levels', 'Physical weakness', 'Mental exhaustion');
    report.causes.push(
      'Poor sleep quality or quantity',
      'Chronic stress and anxiety',
      'Dehydration',
      'Poor nutrition and diet',
      'Sedentary lifestyle',
      'Anemia or iron deficiency',
      'Vitamin deficiencies',
      'Thyroid issues'
    );
    report.deficiencies.push('Iron', 'Vitamin B12', 'Vitamin D', 'Folate', 'Magnesium', 'Vitamin B6');
    report.prevention.push(
      'Establish regular sleep schedule (7-8 hours)',
      'Stay physically active with regular exercise',
      'Eat balanced, nutritious meals',
      'Manage stress effectively',
      'Stay hydrated throughout the day',
      'Limit caffeine and alcohol',
      'Take short breaks during work'
    );
    report.cure.push(
      'Improve sleep hygiene and bedtime routine',
      'Start gentle exercise program',
      'Stay well hydrated',
      'Eat iron-rich and nutrient-dense foods',
      'Practice stress reduction techniques',
      'Get sunlight exposure daily',
      'Consider vitamin supplementation after medical advice'
    );
    report.medicines.push(
      'Iron supplements (if deficient)',
      'Vitamin B12 supplements',
      'Vitamin D3 supplements',
      'Multivitamin complex',
      'CoQ10 supplements',
      'Magnesium supplements',
      '⚠️ Get blood tests before supplementation'
    );
    report.yoga.push(
      'Sun Salutations (Surya Namaskar)',
      'Warrior Poses (Virabhadrasana I, II, III)',
      'Tree Pose (Vrksasana)',
      'Camel Pose (Ustrasana)',
      'Pranayama breathing exercises',
      'Power yoga sequences'
    );
    report.exercises.push(
      'Brisk walking 30 minutes daily',
      'Light jogging or running',
      'Swimming',
      'Cycling',
      'Strength training 2-3 times per week',
      'High-Intensity Interval Training (HIIT)',
      'Dance or aerobics'
    );
    report.foodsToEat.push(
      'Lean red meat and poultry',
      'Spinach and dark leafy greens',
      'Lentils, beans, and legumes',
      'Quinoa and whole grains',
      'Eggs',
      'Citrus fruits',
      'Nuts and seeds',
      'Bananas',
      'Oatmeal',
      'Greek yogurt'
    );
    report.foodsToAvoid.push(
      'Refined sugars and sweets',
      'Processed and fast foods',
      'Excessive caffeine',
      'Alcohol',
      'Heavy, greasy meals',
      'White bread and refined carbs',
      'Energy drinks'
    );
    report.thingsToFollow.push(
      'Consistent sleep-wake schedule',
      'Regular meal times',
      'Daily physical activity',
      'Stress management practices',
      'Adequate water intake (8-10 glasses)',
      'Regular health checkups',
      'Mindfulness and meditation',
      'Social connections and activities'
    );
    report.thingsToAvoid.push(
      'Late night screen time',
      'Skipping meals',
      'Oversleeping on weekends',
      'Excessive stress without relief',
      'Sedentary lifestyle',
      'Negative thoughts and worry',
      'Isolation'
    );
    report.naturalRemedies.push(
      'Ashwagandha supplements (adaptogen)',
      'Ginseng tea',
      'Rhodiola rosea',
      'Maca root powder',
      'Green tea for natural energy',
      'Beetroot juice',
      'Cordyceps mushroom',
      'Holy basil (Tulsi) tea',
      'Spirulina supplements'
    );
  }

  // Back pain
  if (symptoms.includes('back') || symptoms.includes('spine')) {
    report.symptoms.push('Back pain', 'Spinal discomfort', 'Lower back stiffness', 'Muscle tension');
    report.causes.push(
      'Poor posture and ergonomics',
      'Muscle strain from overexertion',
      'Sedentary lifestyle',
      'Improper lifting technique',
      'Weak core muscles',
      'Stress and tension',
      'Prolonged sitting',
      'Lack of exercise'
    );
    report.deficiencies.push('Vitamin D', 'Calcium', 'Magnesium', 'Vitamin K', 'Vitamin B12');
    report.prevention.push(
      'Maintain good posture while sitting and standing',
      'Strengthen core and back muscles',
      'Use proper lifting techniques',
      'Take regular breaks from sitting',
      'Ergonomic workspace setup',
      'Regular stretching exercises',
      'Maintain healthy weight'
    );
    report.cure.push(
      'Apply heat or ice packs alternately',
      'Gentle stretching exercises',
      'Rest but avoid prolonged bed rest',
      'Massage therapy',
      'Physical therapy exercises',
      'Maintain proper posture',
      'Gradual return to normal activities'
    );
    report.medicines.push(
      'Ibuprofen (NSAIDs) for pain relief',
      'Acetaminophen for mild pain',
      'Muscle relaxants (prescription)',
      'Topical pain relief creams',
      'Vitamin D and Calcium supplements',
      '⚠️ Consult doctor for persistent or severe pain'
    );
    report.yoga.push(
      'Cat-Cow Pose (Marjaryasana-Bitilasana)',
      'Child\'s Pose (Balasana)',
      'Downward-Facing Dog (Adho Mukha Svanasana)',
      'Cobra Pose (Bhujangasana)',
      'Bridge Pose (Setu Bandhasana)',
      'Spinal Twist (Ardha Matsyendrasana)',
      'Thread the Needle Pose'
    );
    report.exercises.push(
      'Core strengthening exercises',
      'Pelvic tilts',
      'Bird-dog exercise',
      'Planks (modified if needed)',
      'Swimming',
      'Walking',
      'Gentle stretching routines',
      'Pilates for core stability'
    );
    report.foodsToEat.push(
      'Dairy products (milk, yogurt, cheese)',
      'Leafy greens (kale, collards)',
      'Fatty fish (salmon, mackerel)',
      'Nuts and seeds',
      'Tofu and soy products',
      'Anti-inflammatory foods (turmeric, ginger)',
      'Berries',
      'Olive oil'
    );
    report.foodsToAvoid.push(
      'Processed and fried foods',
      'Excessive sugar',
      'Trans fats',
      'Refined carbohydrates',
      'Alcohol',
      'High-sodium foods',
      'Inflammatory foods'
    );
    report.thingsToFollow.push(
      'Proper posture always',
      'Regular exercise routine',
      'Ergonomic work environment',
      'Stress management',
      'Adequate sleep on supportive mattress',
      'Maintain healthy weight',
      'Stay active throughout the day'
    );
    report.thingsToAvoid.push(
      'Prolonged sitting or standing',
      'Heavy lifting without proper technique',
      'Sudden twisting movements',
      'High-impact activities during pain',
      'Smoking (reduces blood flow)',
      'Ignoring pain signals',
      'Bed rest for extended periods'
    );
    report.naturalRemedies.push(
      'Turmeric (curcumin) supplements',
      'Ginger tea for inflammation',
      'Arnica gel topical application',
      'Epsom salt baths',
      'Devil\'s claw supplements',
      'White willow bark tea',
      'Capsaicin cream',
      'Hot and cold therapy',
      'Essential oils massage (lavender, peppermint)'
    );
  }

  // Chest discomfort
  if (symptoms.includes('chest') || symptoms.includes('heart')) {
    report.symptoms.push('Chest discomfort', 'Chest tightness', 'Breathing discomfort');
    report.causes.push(
      'Anxiety and stress',
      'Acid reflux (GERD)',
      'Muscle strain',
      'Poor posture',
      'Respiratory issues',
      'Panic attacks'
    );
    report.deficiencies.push('Magnesium', 'Potassium', 'Vitamin D', 'CoQ10', 'Omega-3');
    report.prevention.push(
      'Practice stress management daily',
      'Avoid eating large meals before bed',
      'Maintain healthy weight',
      'Regular cardiovascular exercise',
      'Practice good posture',
      'Avoid trigger foods'
    );
    report.cure.push(
      'Deep breathing and relaxation exercises',
      'Meditation techniques',
      'Avoid trigger foods for acid reflux',
      'Elevate head while sleeping',
      'Practice mindfulness',
      '⚠️ EMERGENCY: Seek immediate medical attention if chest pain is severe, persistent, or accompanied by shortness of breath, sweating, nausea, or radiating pain'
    );
    report.medicines.push(
      'Antacids for acid reflux',
      'Proton pump inhibitors (PPIs) if prescribed',
      'Anti-anxiety medication if prescribed',
      'Magnesium supplements',
      '⚠️ IMPORTANT: Chest pain requires medical evaluation'
    );
    report.yoga.push(
      'Pranayama (deep breathing exercises)',
      'Meditation and mindfulness',
      'Cat-Cow Pose',
      'Cobra Pose (gentle)',
      'Bridge Pose',
      'Corpse Pose for relaxation'
    );
    report.exercises.push(
      'Gentle walking',
      'Swimming (if cleared by doctor)',
      'Light stretching',
      'Deep breathing exercises',
      'Yoga for stress relief',
      '⚠️ Avoid vigorous exercise until cleared by doctor'
    );
    report.foodsToEat.push(
      'Oatmeal',
      'Bananas',
      'Leafy greens',
      'Fatty fish',
      'Nuts (almonds, walnuts)',
      'Berries',
      'Avocados',
      'Ginger'
    );
    report.foodsToAvoid.push(
      'Spicy foods',
      'Citrus fruits (if acid reflux)',
      'Caffeine',
      'Alcohol',
      'Fried and fatty foods',
      'Carbonated beverages',
      'Chocolate',
      'Tomato-based products'
    );
    report.thingsToFollow.push(
      'Regular medical checkups',
      'Stress management daily',
      'Proper sleep routine',
      'Small, frequent meals',
      'Relaxation techniques',
      'Monitor symptoms carefully'
    );
    report.thingsToAvoid.push(
      'High-stress situations',
      'Overeating',
      'Lying down after meals',
      'Smoking',
      'Excessive caffeine',
      'Alcohol consumption',
      'Ignoring symptoms'
    );
    report.naturalRemedies.push(
      'Ginger tea for digestion',
      'Chamomile tea for relaxation',
      'Aloe vera juice',
      'Licorice root (DGL)',
      'Slippery elm',
      'Lavender aromatherapy',
      'Valerian root for anxiety',
      'Hawthorn supplements (for heart health)'
    );
  }

  // Default if no specific symptoms matched
  if (report.symptoms.length === 0) {
    report.symptoms.push('General health concerns', 'Need for wellness assessment');
    report.causes.push('Various lifestyle and environmental factors', 'Preventive health maintenance needed');
    report.deficiencies.push('General nutritional balance recommended');
    report.prevention.push(
      'Maintain balanced diet',
      'Regular exercise',
      'Adequate sleep (7-8 hours)',
      'Stress management',
      'Regular health checkups',
      'Stay hydrated'
    );
    report.cure.push(
      'Consult healthcare professional for specific diagnosis',
      'Maintain healthy lifestyle habits',
      'Monitor any new symptoms',
      'Keep health journal'
    );
    report.medicines.push(
      'Multivitamin supplements',
      'Omega-3 supplements',
      '⚠️ Consult doctor for personalized recommendations'
    );
    report.yoga.push(
      'General yoga practice',
      'Pranayama breathing',
      'Meditation',
      'Basic stretching',
      'Sun Salutations'
    );
    report.exercises.push(
      'Walking 30 minutes daily',
      'Swimming',
      'Cycling',
      'Strength training',
      'Flexibility exercises'
    );
    report.foodsToEat.push(
      'Fruits and vegetables',
      'Whole grains',
      'Lean proteins',
      'Healthy fats',
      'Nuts and seeds'
    );
    report.foodsToAvoid.push(
      'Processed foods',
      'Excessive sugar',
      'Trans fats',
      'Excessive sodium'
    );
    report.thingsToFollow.push(
      'Regular health screenings',
      'Balanced lifestyle',
      'Adequate rest',
      'Stress management',
      'Social connections'
    );
    report.thingsToAvoid.push(
      'Sedentary lifestyle',
      'Poor sleep habits',
      'Excessive stress',
      'Unhealthy eating'
    );
    report.naturalRemedies.push(
      'Green tea',
      'Turmeric',
      'Ginger',
      'Garlic',
      'Herbal teas'
    );
  }

  // Generate summary
  report.summary = `Based on your comprehensive health assessment, we've identified ${report.symptoms.length} primary health concern(s). Our AI analysis has determined ${report.causes.length} potential contributing factors and detected ${report.deficiencies.length} nutritional areas that may need attention. Your personalized health plan includes ${report.yoga.length} yoga practices, ${report.exercises.length} exercise recommendations, and detailed dietary guidance with ${report.foodsToEat.length} beneficial foods and ${report.naturalRemedies.length} natural remedies to support your wellness journey.`;

  // Calculate health score based on severity and number of symptoms
  const severityScore = symptoms.includes('severe') ? 20 : symptoms.includes('moderate') ? 10 : 5;
  report.healthScore = Math.max(40, Math.min(95, 100 - (report.symptoms.length * 8) - severityScore));

  return report;
}

export function saveReport(report: HealthReport) {
  const reports = JSON.parse(localStorage.getItem('healthReports') || '[]');
  reports.unshift(report);
  localStorage.setItem('healthReports', JSON.stringify(reports));
}

export function getReports(userId: string): HealthReport[] {
  const reports = JSON.parse(localStorage.getItem('healthReports') || '[]');
  return reports.filter((r: HealthReport) => r.userId === userId);
}

export function getReportById(id: string): HealthReport | null {
  const reports = JSON.parse(localStorage.getItem('healthReports') || '[]');
  return reports.find((r: HealthReport) => r.id === id) || null;
}

export function calculateAverageHealthScore(userId: string): number {
  const reports = getReports(userId);
  if (reports.length === 0) return 0;
  const sum = reports.reduce((acc, report) => acc + report.healthScore, 0);
  return Math.round(sum / reports.length);
}
