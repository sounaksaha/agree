import express from 'express';
import passport from 'passport';
import { registerAdmin, loginAdmin, getProfile } from '../controllers/admin_controller/adminController.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { validateLogin, validateRegistration } from '../middleware/validate.js';

const router = express.Router();

router.post('/register', validateRegistration, registerAdmin);
router.post('/login', validateLogin, loginAdmin);
router.get('/profiles', passport.authenticate('jwt', { session: false }), authorizeRoles('admin'), getProfile);

export default router;
