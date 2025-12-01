export const MOCK_USERS = {
    admin: {
        id: 1,
        username: 'Admin User',
        email: 'admin@demo.com',
        role: 'admin',
        token: 'mock-admin-token'
    },
    student: {
        id: 2,
        username: 'Student User',
        email: 'student@demo.com',
        role: 'student',
        token: 'mock-student-token'
    }
};

export const MOCK_EXAMS = [
    {
        id: 1,
        title: 'General Knowledge Mock Test',
        duration: 15,
        questionCount: 5,
        isActive: true,
        Subject: { name: 'General Knowledge' }
    },
    {
        id: 2,
        title: 'Mathematics Basic Test',
        duration: 20,
        questionCount: 5,
        isActive: true,
        Subject: { name: 'Mathematics' }
    }
];

export const MOCK_QUESTIONS = [
    {
        id: 1,
        text: 'What is the capital of France?',
        options: JSON.stringify(['London', 'Berlin', 'Paris', 'Madrid']),
        correctOption: 3,
        difficulty: 'easy',
        SubjectId: 1
    },
    {
        id: 2,
        text: 'Which planet is known as the Red Planet?',
        options: JSON.stringify(['Venus', 'Mars', 'Jupiter', 'Saturn']),
        correctOption: 2,
        difficulty: 'easy',
        SubjectId: 1
    },
    {
        id: 3,
        text: 'What is 2 + 2?',
        options: JSON.stringify(['3', '4', '5', '6']),
        correctOption: 2,
        difficulty: 'easy',
        SubjectId: 2
    },
    {
        id: 4,
        text: 'Who wrote "Hamlet"?',
        options: JSON.stringify(['Shakespeare', 'Dickens', 'Twain', 'Austen']),
        correctOption: 1,
        difficulty: 'medium',
        SubjectId: 1
    },
    {
        id: 5,
        text: 'What is the chemical symbol for Gold?',
        options: JSON.stringify(['Ag', 'Fe', 'Au', 'Pb']),
        correctOption: 3,
        difficulty: 'hard',
        SubjectId: 2
    }
];
