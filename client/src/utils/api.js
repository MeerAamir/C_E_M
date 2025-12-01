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

// Add a request interceptor for tokens
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Mock Adapter Logic
if (IS_MOCK_MODE) {
    console.warn('⚠️ RUNNING IN MOCK MODE - NO BACKEND CONNECTION');

    api.defaults.adapter = async (config) => {
        await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network delay

        console.log(`[MOCK API] ${config.method.toUpperCase()} ${config.url}`);

        // --- AUTH ROUTES ---
        if (config.url.includes('/auth/login')) {
            const data = JSON.parse(config.data);
            const user = Object.values(MOCK_USERS).find(u => u.email === data.email);
            if (user) return { data: { token: user.token, user }, status: 200 };
            return { data: { message: 'Invalid credentials' }, status: 401 };
        }

        if (config.url.includes('/auth/register')) {
            return { data: { message: 'Registered', user: MOCK_USERS.student }, status: 201 };
        }

        // --- STUDENT ROUTES ---

        // Dashboard: Get Available Exams
        // Matches /user/exams
        if (config.url.includes('/user/exams')) {
            return { data: MOCK_EXAMS, status: 200 };
        }

        // Take Exam: Get Questions
        // Matches /user/exam/:id/questions
        if (config.url.includes('/user/exam/') && config.url.includes('/questions')) {
            return {
                data: {
                    exam: MOCK_EXAMS[0],
                    questions: MOCK_QUESTIONS
                },
                status: 200
            };
        }

        // Submit Exam
        // Matches /user/exam/submit
        if (config.url.includes('/user/exam/submit')) {
            return {
                data: {
                    message: 'Exam submitted successfully',
                    score: 80,
                    total: 100,
                    results: MOCK_QUESTIONS.map(q => ({
                        questionId: q.id,
                        correct: true,
                        correctOption: q.correctOption
                    }))
                },
                status: 200
            };
        }

        // --- ADMIN ROUTES ---
        if (config.url.includes('/admin')) {
            return { data: { message: 'Admin action successful (Mock)' }, status: 200 };
        }

        // Default Fallback
        return { data: { message: 'Mock Success' }, status: 200 };
    };
}

export default api;
