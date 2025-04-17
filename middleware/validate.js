import { body, validationResult } from 'express-validator';

export const validateRegistration = [
  // Email Validation
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required') // Message if email is empty
    .isEmail()
    .withMessage('Please provide a valid email address'), // Message if email format is invalid

  // Password Validation
  body('password')
    .notEmpty()
    .withMessage('Password is required') // Message if password is empty
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'), // Message if password is too short

  // Final Validation Handling
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Format errors with field and message
      const formattedErrors = errors.array().map((err) => ({
        field: err.param,
        message: err.msg
      }));

      // Send response with formatted errors
      return res.status(400).json({
        message: 'Validation failed',
        errors: formattedErrors
      });
    }

    next();
  }
];

export const validateLogin = [
  // Email Validation
  body('email')
    .notEmpty()
    .withMessage('Email is required') // Message if email is empty
    .isEmail()
    .withMessage('Please provide a valid email address'), // Message if email format is invalid

  // Password Validation
  body('password')
    .notEmpty()
    .withMessage('Password is required'), // Message if password is empty

  // Final Validation Handling
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Format errors with field and message
      const formattedErrors = errors.array().map((err) => ({
        field: err.param,
        message: err.msg
      }));

      // Send response with formatted errors
      return res.status(400).json({
        message: 'Validation failed',
        errors: formattedErrors
      });
    }

    next();
  }
];

