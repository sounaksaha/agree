import { body, validationResult } from 'express-validator';

export const validateRegistration = [
  // Optional email, but if provided, validate format
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address'),

  // Optional phone, but if provided, validate it
  body('phone')
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone number must be exactly 10 digits'),

  // Always required password
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  // Custom validator to ensure at least email or phone is provided
  (req, res, next) => {
    const { email, phone } = req.body;

    if (!email && !phone) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: [
          {
            field: 'email_or_phone',
            message: 'Either email or phone is required'
          }
        ]
      });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((err) => ({
        field: err.param,
        message: err.msg
      }));

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

