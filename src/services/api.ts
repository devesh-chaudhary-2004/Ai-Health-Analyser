import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (name: string, email: string, password: string, age: number, gender?: string) => {
    const response = await api.post("/auth/register", { name, email, password, age, gender });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  updateProfile: async (updates: any) => {
    const response = await api.put("/auth/profile", updates);
    return response.data;
  },
};

// Health Report API
export const healthReportAPI = {
  generateAnalysis: async (
    userId: string,
    symptomsText: string,
    type: "report" | "planner" | "both" = "report",
    additionalData?: {
      duration?: string;
      severity?: string;
      frequency?: string;
      worseCondition?: string;
      existingConditions?: string;
      medications?: string;
      lifestyle?: string;
      dietPreference?: string;
    }
  ) => {
    const response = await api.post(
      `/weekly-planner/generate-analysis?type=${type}`,
      {
        userId,
        symptomsText,
        ...additionalData,
      }
    );
    return response.data;
  },

  getReportsByUser: async (userId: string) => {
    const response = await api.get(`/reports/user/${userId}`);
    return response.data;
  },

  getReportById: async (id: string) => {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },

  deleteReport: async (id: string) => {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
  },

  getAverageHealthScore: async (userId: string) => {
    const response = await api.get(`/reports/average-score/${userId}`);
    return response.data;
  },
};

// Weekly Planner API
export const weeklyPlannerAPI = {
  generatePlanner: async (
    userId: string,
    symptomsText: string,
    reportId?: string,
    additionalData?: {
      duration?: string;
      severity?: string;
      frequency?: string;
      worseCondition?: string;
      existingConditions?: string;
      medications?: string;
      lifestyle?: string;
      dietPreference?: string;
    }
  ) => {
    const response = await api.post(
      `/weekly-planner/generate-analysis?type=planner`,
      {
        userId,
        symptomsText,
        reportId,
        ...additionalData,
      }
    );
    return response.data;
  },
};

// Chatbot API
export const chatbotAPI = {
  chat: async (message: string, userId: string) => {
    const response = await api.post("/chatbot/chat", {
      message,
      userId,
    });
    return response.data;
  },
};

// Reminders API
export const reminderAPI = {
  createReminder: async (reminderData: any) => {
    const response = await api.post("/reminders/", reminderData);
    return response.data;
  },

  getUserReminders: async (userId: string, filters?: { isActive?: boolean; type?: string }) => {
    const params = new URLSearchParams();
    if (filters?.isActive !== undefined) params.append('isActive', String(filters.isActive));
    if (filters?.type) params.append('type', filters.type);
    const response = await api.get(`/reminders/user/${userId}?${params.toString()}`);
    return response.data;
  },

  updateReminder: async (id: string, updates: any) => {
    const response = await api.put(`/reminders/${id}`, updates);
    return response.data;
  },

  deleteReminder: async (id: string) => {
    const response = await api.delete(`/reminders/${id}`);
    return response.data;
  },

  completeReminder: async (id: string) => {
    const response = await api.post(`/reminders/${id}/complete`);
    return response.data;
  },

  createRemindersFromReport: async (reportId: string, userId: string) => {
    const response = await api.post("/reminders/from-report", { reportId, userId });
    return response.data;
  },

  createRemindersFromPlanner: async (plannerId: string, userId: string) => {
    const response = await api.post("/reminders/from-planner", { plannerId, userId });
    return response.data;
  },
};

export default api;

