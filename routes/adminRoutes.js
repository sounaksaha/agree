import express from 'express';
import passport from 'passport';
import {   getProfile } from '../controllers/Auth/authController.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import {  validateRegistration } from '../middleware/validate.js';
import { registerUser } from '../controllers/user_controller/userController.js';

const router = express.Router();

router.post('/register', validateRegistration, registerUser);

router.get('/profiles', passport.authenticate('jwt', { session: false }), authorizeRoles('admin'), getProfile);


export default router;