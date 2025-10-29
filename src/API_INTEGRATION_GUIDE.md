# 🔌 API Integration Guide

This guide explains how to integrate the AI Health & Wellness Analyzer with real backend services and APIs.

## Table of Contents
1. [OpenAI Integration](#openai-integration)
2. [Supabase Integration](#supabase-integration)
3. [Custom Backend Integration](#custom-backend-integration)
4. [Environment Variables](#environment-variables)

---

## 🤖 OpenAI Integration

### Health Analyzer with OpenAI GPT-4

Update `/utils/healthAnalyzer.ts`:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo; use backend in production
});

export async function analyzeHealth(symptomsText: string, userId: string): Promise<HealthReport> {
  const prompt = `You are a health analysis AI. Analyze the following symptoms and provide a structured response in JSON format:

Symptoms: "${symptomsText}"

Provide:
1. List of detected symptoms
2. Possible causes
3. Nutritional deficiencies to address
4. Prevention tips
5. Medical remedies
6. Yoga exercises
7. Foods to eat
8. Foods to avoid
9. Health score (0-100)
10. Brief summary

Format as valid JSON with these exact keys: symptoms, causes, deficiencies, prevention, remedies, yoga, foodsToEat, foodsToAvoid, healthScore, summary`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a medical health advisor AI. Provide evidence-based health advice."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const response = completion.choices[0].message.content;
    const parsedData = JSON.parse(response || '{}');

    return {
      id: Date.now().toString(),
      userId,
      date: new Date().toISOString(),
      ...parsedData
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to analyze health data');
  }
}
```

### Chatbot with OpenAI

Update `/pages/Chatbot.tsx`:

```typescript
const generateBotResponse = async (userMessage: string): Promise<string> => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful health assistant. Provide accurate, evidence-based health advice. Always remind users to consult healthcare professionals for serious concerns."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.8,
      max_tokens: 500
    });

    return completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('OpenAI Error:', error);
    return "I'm having trouble connecting. Please try again.";
  }
};
```

---

## 🗄️ Supabase Integration

### 1. Setup Supabase Project

Create these tables in your Supabase project:

#### Users Table (extends Supabase auth)
```sql
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER,
  height INTEGER,
  weight INTEGER,
  gender TEXT,
  lifestyle TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Health Reports Table
```sql
CREATE TABLE health_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  symptoms TEXT[] NOT NULL,
  causes TEXT[],
  deficiencies TEXT[],
  prevention TEXT[],
  remedies TEXT[],
  yoga TEXT[],
  foods_to_eat TEXT[],
  foods_to_avoid TEXT[],
  health_score INTEGER,
  summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE health_reports ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own reports
CREATE POLICY "Users can view own reports" ON health_reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reports" ON health_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

#### Chat History Table
```sql
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  message TEXT NOT NULL,
  sender TEXT NOT NULL, -- 'user' or 'bot'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chats" ON chat_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chats" ON chat_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 2. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### 3. Create Supabase Client

Create `/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 4. Update AuthContext

Update `/context/AuthContext.tsx`:

```typescript
import { supabase } from '../lib/supabase';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await loadUserProfile(session.user.id);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setUser(data);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Login error:', error);
      return false;
    }

    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      console.error('Registration error:', error);
      return false;
    }

    if (data.user) {
      // Create user profile
      await supabase.from('user_profiles').insert([
        {
          id: data.user.id,
          name,
          email
        }
      ]);
    }

    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;

    const { error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id);

    if (!error) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 5. Update Health Reports Storage

Update `/utils/healthAnalyzer.ts`:

```typescript
import { supabase } from '../lib/supabase';

export async function saveReport(report: HealthReport) {
  const { error } = await supabase
    .from('health_reports')
    .insert([{
      user_id: report.userId,
      symptoms: report.symptoms,
      causes: report.causes,
      deficiencies: report.deficiencies,
      prevention: report.prevention,
      remedies: report.remedies,
      yoga: report.yoga,
      foods_to_eat: report.foodsToEat,
      foods_to_avoid: report.foodsToAvoid,
      health_score: report.healthScore,
      summary: report.summary
    }]);

  if (error) {
    console.error('Error saving report:', error);
    throw error;
  }
}

export async function getReports(userId: string): Promise<HealthReport[]> {
  const { data, error } = await supabase
    .from('health_reports')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reports:', error);
    return [];
  }

  return data.map(r => ({
    id: r.id,
    userId: r.user_id,
    date: r.date,
    symptoms: r.symptoms,
    causes: r.causes,
    deficiencies: r.deficiencies,
    prevention: r.prevention,
    remedies: r.remedies,
    yoga: r.yoga,
    foodsToEat: r.foods_to_eat,
    foodsToAvoid: r.foods_to_avoid,
    healthScore: r.health_score,
    summary: r.summary
  }));
}
```

---

## 🔧 Custom Backend Integration

### Example Node.js/Express Backend

#### Server Setup (`server.js`)

```javascript
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUrl = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const client = await MongoClient.connect(mongoUrl);
  const db = client.db('health_app');
  
  const result = await db.collection('users').insertOne({
    name,
    email,
    password: hashedPassword,
    createdAt: new Date()
  });
  
  const token = jwt.sign({ userId: result.insertedId }, jwtSecret);
  
  res.json({ token, user: { id: result.insertedId, name, email } });
  
  client.close();
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  const client = await MongoClient.connect(mongoUrl);
  const db = client.db('health_app');
  
  const user = await db.collection('users').findOne({ email });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ userId: user._id }, jwtSecret);
  
  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email }
  });
  
  client.close();
});

// Health Analysis Route
app.post('/api/analyze', authenticateToken, async (req, res) => {
  const { symptoms } = req.body;
  const userId = req.userId;
  
  // Call OpenAI or your AI service here
  const analysis = await analyzeHealthWithAI(symptoms);
  
  const client = await MongoClient.connect(mongoUrl);
  const db = client.db('health_app');
  
  const result = await db.collection('health_reports').insertOne({
    userId,
    ...analysis,
    createdAt: new Date()
  });
  
  res.json({ ...analysis, id: result.insertedId });
  
  client.close();
});

// Middleware
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.userId;
    next();
  });
}

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

#### Frontend API Calls

Create `/lib/api.ts`:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function apiLogin(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) throw new Error('Login failed');
  
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data.user;
}

export async function apiAnalyzeHealth(symptoms: string) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ symptoms })
  });
  
  if (!response.ok) throw new Error('Analysis failed');
  
  return response.json();
}
```

---

## 🔐 Environment Variables

Create `.env.local`:

```bash
# OpenAI
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-openai-api-key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Custom Backend (if using)
NEXT_PUBLIC_API_URL=https://your-api.com/api

# JWT Secret (backend only)
JWT_SECRET=your-secret-key

# MongoDB (if using)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/health_app
```

---

## ⚠️ Security Best Practices

### DO NOT:
- ❌ Expose API keys in client-side code
- ❌ Store sensitive data in localStorage without encryption
- ❌ Use `dangerouslyAllowBrowser` in production
- ❌ Skip input validation
- ❌ Trust client-side data

### DO:
- ✅ Use environment variables
- ✅ Implement backend API routes
- ✅ Add rate limiting
- ✅ Validate and sanitize all inputs
- ✅ Use HTTPS/SSL
- ✅ Implement proper CORS
- ✅ Hash passwords (bcrypt/argon2)
- ✅ Use JWT tokens with expiration
- ✅ Add request logging
- ✅ Implement error handling

---

## 📚 Additional Resources

- [OpenAI API Docs](https://platform.openai.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

**Need Help?** Open an issue or check the documentation for your chosen backend service.
