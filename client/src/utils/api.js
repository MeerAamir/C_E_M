import axios from 'axios';
import { MOCK_USERS, MOCK_EXAMS, MOCK_QUESTIONS } from './mockData';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const IS_MOCK_MODE = process.env.REACT_APP_MOCK_MODE === 'true';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Mock Adapter Logic
if (IS_MOCK_MODE) {
    console.warn('⚠️ RUNNING IN MOCK MODE - NO BACKEND CONNECTION');

    api.interceptors.request.use(async (config) => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

        // Auth Routes
        if (config.url.includes('/auth/login')) {
            const { email } = JSON.parse(config.data);
            const user = Object.values(MOCK_USERS).find(u => u.email === email);
            if (user) {
                return Promise.resolve({
                    data: { token: user.token, user },
                    status: 200,
                    statusText: 'OK',
                    headers: {},
                    config
                });
            }
        }

        if (config.url.includes('/auth/register')) {
            return Promise.resolve({
                data: { message: 'Registration successful (Mock)', user: MOCK_USERS.student },
                status: 201,
            },
                status: 200,
                config
            });
}

// Admin Routes
if (config.url.includes('/admin')) {
    return Promise.resolve({
        data: { message: 'Admin action successful (Mock)' },
        status: 200,
        config
    });
}

// Default Fallback
return Promise.resolve({
    data: { message: 'Mock response' },
    status: 200,
    config
});
    });
}

// Add a request interceptor if needed (e.g., for tokens)
api.interceptors.request.use(
    (config) => {
        // Skip normal interceptor if we already handled it in mock (axios doesn't support this natively easily without an adapter, 
        // but our mock logic above returns a Promise.resolve which effectively short-circuits if we were using a real adapter library.
        // Since we are using a simple interceptor hack, we actually need to throw a special error or use an adapter.
        // BETTER APPROACH: Use an adapter.
        return config;
    },
    (error) => Promise.reject(error)
);

// Overwrite adapter for Mock Mode to prevent actual network calls
if (IS_MOCK_MODE) {
    api.defaults.adapter = async (config) => {
        await new Promise(resolve => setTimeout(resolve, 600)); // Simulate delay

        console.log(`[MOCK API] ${config.method.toUpperCase()} ${config.url}`);

        // Login
        if (config.url.includes('/auth/login')) {
            const data = JSON.parse(config.data);
            const user = Object.values(MOCK_USERS).find(u => u.email === data.email);
            if (user) return { data: { token: user.token, user }, status: 200 };
            return { data: { message: 'Invalid credentials' }, status: 401 };
        }

        // Register
        if (config.url.includes('/auth/register')) {
            return { data: { message: 'Registered', user: MOCK_USERS.student }, status: 201 };
        }

        // Get Exams
        if (config.url.includes('/exam/available')) {
            return { data: MOCK_EXAMS, status: 200 };
        }

        // Take Exam (Questions)
        if (config.url.match(/\/exam\/\d+/)) {
            return { data: { exam: MOCK_EXAMS[0], questions: MOCK_QUESTIONS }, status: 200 };
        }

        // Submit Exam
        if (config.url.includes('/exam/submit')) {
            return {
                data: {
                    score: 4,
                    totalQuestions: 5,
                    results: MOCK_QUESTIONS.map(q => ({ ...q, isCorrect: true }))
                },
                status: 200
            };
        }

        // Admin Stats
        if (config.url.includes('/admin/stats')) {
            return { data: { users: 150, exams: 12, questions: 500 }, status: 200 };
        }

        return { data: { message: 'Mock Success' }, status: 200 };
    };
}

export default api;
