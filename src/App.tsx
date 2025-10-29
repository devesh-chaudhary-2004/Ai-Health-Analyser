import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Feedback from './pages/Feedback';
import HealthAnalyzer from './pages/HealthAnalyzer';
import HealthReport from './pages/HealthReport';
import Dashboard from './pages/Dashboard';
import Chatbot from './pages/Chatbot';
import Profile from './pages/Profile';
import DietPlanner from './pages/DietPlanner';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/analyze" element={<ProtectedRoute><HealthAnalyzer /></ProtectedRoute>} />
            <Route path="/report/:id" element={<ProtectedRoute><HealthReport /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/diet-planner/:reportId?" element={<ProtectedRoute><DietPlanner /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('user');
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export default App;
