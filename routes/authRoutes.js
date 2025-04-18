import express from 'express';
import passport from 'passport';

import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { validateLogin, validateRegistration } from '../middleware/validate.js';
import { getProfile, login, registerAdmin } from '../controllers/Auth/authController.js';

const router = express.Router();

router.post('/register', validateRegistration, registerAdmin);
router.post('/login', validateLogin, login);
router.get('/profiles', passport.authenticate('jwt', { session: false }), authorizeRoles('admin'), getProfile);



export default router;
