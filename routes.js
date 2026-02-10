const express = require('express');
const { body, param, query } = require('express-validator');
const userService = require('./service');
const authenticate = require('../../middlewares/auth');
const validate = require('../../middlewares/validation');

const router = express.Router();

// Create user (Register)
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required').trim(),
    body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  validate,
  async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validate,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await userService.login(email, password);
      res.json({
        success: true,
        data: result,
        message: 'Login successful'
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get all users (with pagination)
router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
  ],
  validate,
  async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await userService.getAllUsers(page, limit);
      res.json({
        success: true,
        data: result.users,
        pagination: result.pagination
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get user by ID
router.get(
  '/:id',
  [
    param('id').isUUID().withMessage('Invalid user ID format')
  ],
  validate,
  async (req, res, next) => {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }
);

// Update user
router.put(
  '/:id',
  authenticate,
  [
    param('id').isUUID().withMessage('Invalid user ID format'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty').trim(),
    body('email').optional().isEmail().withMessage('Invalid email format').normalizeEmail(),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  validate,
  async (req, res, next) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json({
        success: true,
        data: user,
        message: 'User updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

// Delete user (soft delete)
router.delete(
  '/:id',
  authenticate,
  [
    param('id').isUUID().withMessage('Invalid user ID format')
  ],
  validate,
  async (req, res, next) => {
    try {
      const result = await userService.deleteUser(req.params.id);
      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
