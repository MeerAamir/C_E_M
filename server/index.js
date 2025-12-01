const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./db/database');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS configuration for production
const allowedOrigins = [
  'http://localhost:3000',
  'https://meeraamir.github.io',
  'https://competitive-exam-management-system.netlify.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes); // Changed from /exam to /user for consistency with plan, but can adjust

// Basic Route
app.get('/', (req, res) => {
  res.send('Competitive Exam System API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start Server
// Only start if not in test mode
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync().then(() => {
    console.log('Database connected and synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}

module.exports = app; // For testing
