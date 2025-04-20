import express from 'express';
import passport from 'passport';
import {   getProfile } from '../controllers/Auth/authController.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import {  validateRegistration } from '../middleware/validate.js';
import { registerUser } from '../controllers/admin_controller/userCreate.js';
import { createForm } from '../controllers/admin_controller/formController.js';

const router = express.Router();

router.post('/register', validateRegistration, registerUser);

router.get('/profiles', passport.authenticate('jwt', { session: false }), authorizeRoles('admin'), getProfile);
router.post('/form/create', passport.authenticate('jwt', { session: false }), authorizeRoles('admin'), createForm);

export default router;