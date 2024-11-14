const express = require('express');
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

router.post('/register', [
  body('username').isLength({ min: 5 }).withMessage('Username minimal 5 karakter'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
  body('email').isEmail().withMessage('Email tidak valid')
], register);

router.post('/login', login);

module.exports = router; 