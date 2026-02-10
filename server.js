const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { sequelize } = require('./src/config/database');
const errorHandler = require('./src/middlewares/errorHandler');
const userRoutes = require('./src/modules/user');
const meetingRoutes = require('./src/modules/meeting');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Meeting Scheduler API is running' });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/meetings', meetingRoutes);

// Error handling
app.use(errorHandler);

// Database sync and server start
sequelize.sync({ alter: false })
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to database:', err);
    process.exit(1);
  });

module.exports = app;
