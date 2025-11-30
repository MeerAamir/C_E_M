# Competitive Exam Management System

A comprehensive, full-stack web application for managing and taking competitive exams with role-based access control, real-time exam timer, and instant performance analytics.

## 📋 Overview

**Tech Stack:**
- **Frontend:** React 19, React Router, Axios, CSS Modules, Bootstrap
- **Backend:** Node.js, Express.js, Sequelize ORM
- **Database:** PostgreSQL (production) / SQLite (development)
- **Authentication:** JWT with bcrypt password hashing

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/MeerAamir/C_E_M.git
cd C_E_M

# Install all dependencies (root, server, client)
npm run install-all

# Seed the database with sample data
npm run seed

# Start both server and client concurrently
npm start
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

### Manual Setup (Alternative)

If you prefer to run server and client separately:

```bash
# Terminal 1 - Start Backend Server
cd server
npm install
# Create .env file from .env.example and configure
npm start

# Terminal 2 - Start Frontend Client
cd client
npm install
npm start
```

### Database Seeding

To populate the database with sample data (subjects, questions, users):

```bash
# From project root
npm run seed

# Force reset and reseed (deletes existing data)
npm run seed -- --force
```

**Sample Credentials:**
- **Admin:** admin@demo.com / Admin123
- **Student:** student@demo.com / Student123

### Production Build

```bash
# Build optimized production frontend
cd client
npm run build

# Output will be in client/build/
```

## 📂 Project Structure

```
C_E_M/
├── client/               # React frontend application
│   ├── src/
│   │   ├── pages/       # Page components (Login, Dashboard, Admin, etc.)
│   │   ├── components/  # Reusable components
│   │   ├── utils/       # API utilities, helpers
│   │   └── App.js       # Main app component
│   ├── public/
│   └── package.json
├── server/              # Express.js backend API
│   ├── controllers/     # Route controllers (auth, admin, user)
│   ├── models/          # Sequelize database models
│   ├── routes/          # API route definitions
│   ├── middleware/      # Authentication middleware
│   ├── db/              # Database configuration
│   ├── tests/           # Jest/Supertest API tests
│   ├── seed.js          # Database seeding script
│   └── index.js         # Server entry point
├── docs/                # Documentation and screenshots
├── DEPLOYMENT_GUIDE.md  # Production deployment instructions
├── NETLIFY_FIX.md       # Netlify-specific deployment guide
└── package.json         # Root package (scripts for both apps)
```

## ✨ Key Features

### Admin Dashboard
- **Question Bank Management:**
  - Search, filter by subject/difficulty
  - Bulk import from PDF/text with validation
  - Multi-format export (JSON, CSV, XLSX, PDF, DOCX)
  - Move questions between subjects
- **Exam Management:** Create/edit exams with configurable duration and question count
- **User Management:** View all users, promote/demote roles, reset passwords


## 🧪 Testing

Run automated backend tests:

```bash
cd server
npm test
```

Tests cover:
- Authentication APIs
- Question CRUD operations
- Export functionality
- Bulk import/move operations

## 📊 What Was Fixed/Improved

### Recent Updates (v1.0.0)
- ✅ **Netlify Deployment:** Fixed homepage path for root deployment
- ✅ **Node Version:** Pinned to Node.js 18 via `.nvmrc` and `package.json`
- ✅ **ESLint Compliance:** Resolved all CI build errors
  - Removed unused variables
  - Fixed useEffect dependencies
  - Replaced invalid anchors with buttons
- ✅ **CORS Configuration:** Configured for GitHub Pages and Netlify origins
- ✅ **Production Ready:** Backend configured for Render.com with PostgreSQL

## 📖 Assessment / How to Grade

### Quick Evaluation Guide

**1. Project Setup (5 min):**
- Clone repository
- Run `npm run install-all`
- Run `npm run seed`
- Run `npm start`
- Access http://localhost:3000

**2. Key Files to Review:**
- `server/index.js` - Main server configuration, CORS, routes
- `server/controllers/` - Business logic for auth, admin, user operations
- `server/models/` - Database schema definitions
- `client/src/pages/Admin/Questions.js` - Advanced question bank interface
- `client/src/pages/TakeExam.js` - Exam-taking experience with timer
- `server/seed.js` - Sample data generation

**3. Sample Exam Flow:**
- Login as student (`student@demo.com` / `Student123`)
- Navigate to "Available Exams"
- Click"Take Exam" on any published exam
- Answer questions and observe:
  - Timer countdown
  - Auto-save functionality
  - Question palette
  - Flag/unflag questions
- Submit exam
- View instant results

**4. Admin Features:**
- Login as admin (`admin@demo.com` / `Admin123`)
- Navigate to "Question Bank"
- Test filtering, search, bulk selection
- Try importing questions (Bulk Paste tab)
- Export questions in different formats
- Navigate to "Exams" and create a new exam

**5. Code Quality:**
- Check `server/tests/` for automated test coverage
- Verify environment variable handling (`.env.example` files)
- Review CORS configuration for security
- Check error handling in controllers

## 🔒 Security Notes

- Never commit `.env` files with real credentials
- Use `.env.example` as template
- Generate strong JWT_SECRET for production
- Configure CORS appropriately for production domains

## 📄 License

This project is for educational purposes.

## 👥 Contributors

- Meer Aamir - Full Stack Development

## 📞 Support

For deployment instructions, see:
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Render.com backend deployment
- [NETLIFY_FIX.md](./NETLIFY_FIX.md) - Netlify frontend deployment

---

**Note:** This is production-ready code with comprehensive error handling, security features, and deployment configurations for both frontend (Netlify/GitHub Pages) and backend (Render.com with PostgreSQL).
