# AI Health & Wellness Analyzer

A complete full-stack health analysis application built with React, TypeScript, and Tailwind CSS. This application provides AI-powered health insights, personalized recommendations, and comprehensive wellness tracking.

## 🌟 Features

### Core Functionality
- **User Authentication** - Secure login and registration system
- **AI Health Analysis** - Analyze symptoms and get detailed health reports
- **Personalized Dashboard** - Track your health metrics and progress
- **AI Chatbot** - Interactive health assistant for instant advice
- **Diet Planner** - Generate customized 7-day meal plans
- **PDF Reports** - Download health reports and diet plans as PDFs
- **Progress Tracking** - Visualize health improvements with interactive charts
- **Dark Mode** - Toggle between light and dark themes

### Health Reports Include
- ✅ Detected Symptoms
- ✅ Possible Causes
- ✅ Nutritional Deficiencies
- ✅ Prevention & Lifestyle Tips
- ✅ Medical Remedies & Treatments
- ✅ Yoga & Exercise Recommendations
- ✅ Foods to Eat
- ✅ Foods to Avoid
- ✅ Health Score (0-100)

### Additional Features
- 📊 Interactive progress charts using Recharts
- 💾 Local storage for data persistence
- 📱 Fully responsive design
- 🎨 Glassmorphism UI with modern aesthetics
- 🌈 Gradient color scheme (emerald & cyan)
- ⚡ Fast and smooth transitions

## 🚀 Getting Started

### Demo Usage

1. **Register** - Create a new account with any email and password
2. **Login** - Use your credentials to access the app
3. **Analyze** - Enter your symptoms to get a comprehensive health report
4. **Dashboard** - View your reports, health score, and progress charts
5. **Chatbot** - Ask health-related questions
6. **Diet Plan** - Generate a personalized meal plan
7. **Profile** - Update your personal information

## 🔧 Mock Data & API Integration

### Current Implementation
The application currently uses **mock data** and **simulated AI responses** stored in localStorage. This allows you to fully test all features without external dependencies.

### Integrating Real APIs

To connect to real backend services, update these files:

#### 1. Authentication (`/context/AuthContext.tsx`)
Replace mock functions with API calls:
```typescript
const login = async (email: string, password: string) => {
  const response = await fetch('YOUR_API_URL/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  // Handle response
};
```

#### 2. Health Analysis (`/utils/healthAnalyzer.ts`)
Replace `analyzeHealth()` function with OpenAI API call:
```typescript
export async function analyzeHealth(symptoms: string, userId: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: 'You are a health analysis AI. Analyze symptoms and provide structured health advice.'
      }, {
        role: 'user',
        content: symptoms
      }]
    })
  });
  // Parse and structure response
}
```

#### 3. Chatbot (`/pages/Chatbot.tsx`)
Replace `generateBotResponse()` with real-time AI:
```typescript
const response = await fetch('YOUR_API_URL/chat', {
  method: 'POST',
  body: JSON.stringify({ message: userMessage })
});
```

### Using Supabase (Recommended)

For a complete backend solution with authentication, database, and storage:

1. Create a Supabase project at https://supabase.com
2. Set up authentication in Supabase dashboard
3. Create tables:
   - `users` (id, name, email, age, height, weight, gender, lifestyle)
   - `health_reports` (id, user_id, date, symptoms, causes, deficiencies, etc.)
   - `chat_history` (id, user_id, messages, timestamp)

4. Replace localStorage calls with Supabase queries:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
)

// Save report
await supabase
  .from('health_reports')
  .insert([report])
```

## 📁 Project Structure

```
/
├── App.tsx                      # Main app with routing
├── pages/
│   ├── Home.tsx                 # Landing page
│   ├── Login.tsx                # Login page
│   ├── Register.tsx             # Registration page
│   ├── HealthAnalyzer.tsx       # Symptom analysis
│   ├── HealthReport.tsx         # Report display
│   ├── Dashboard.tsx            # User dashboard
│   ├── Chatbot.tsx              # AI health assistant
│   ├── Profile.tsx              # User profile settings
│   └── DietPlanner.tsx          # Meal plan generator
├── components/
│   ├── Navbar.tsx               # Navigation component
│   └── ui/                      # Shadcn UI components
├── context/
│   ├── AuthContext.tsx          # Authentication state
│   └── ThemeContext.tsx         # Dark mode state
├── utils/
│   └── healthAnalyzer.ts        # Health analysis logic
└── styles/
    └── globals.css              # Global styles
```

## 🎨 Color Scheme

- **Primary**: Emerald Green (#10b981) to Cyan (#06b6d4)
- **Background**: Light gradients (emerald-50, cyan-50, white)
- **Dark Mode**: Gray-900 to Gray-800
- **Accents**: Purple, Orange, Yellow for different sections

## 📦 Dependencies

### Core
- React 18+
- React Router DOM
- TypeScript

### UI & Styling
- Tailwind CSS 4.0
- Lucide React (icons)
- Recharts (charts)

### Utilities
- jsPDF (PDF generation)
- localStorage (data persistence)

## ⚠️ Disclaimer

**IMPORTANT**: This application is for informational and educational purposes only. It should NOT be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical concerns.

The application is designed as a wellness tool and prototype. For production use with real user data:
- Implement proper security measures
- Use HIPAA-compliant infrastructure if handling health data
- Add proper error handling and validation
- Implement rate limiting and API security
- Consider legal compliance for health applications

## 🔐 Security Notes

Current implementation:
- Passwords are stored in localStorage (NOT secure for production)
- No encryption of sensitive data
- Client-side only validation

For production:
- Use bcrypt/argon2 for password hashing
- Implement JWT tokens or session management
- Add HTTPS/SSL
- Validate all inputs server-side
- Use environment variables for API keys
- Implement CORS properly

## 📝 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Social media login
- [ ] Export data to CSV
- [ ] Medication tracking
- [ ] Appointment scheduling
- [ ] Health goal setting
- [ ] Community features
- [ ] Mobile app version
- [ ] Multi-language support

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

## 📄 License

This project is provided as-is for educational purposes.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
