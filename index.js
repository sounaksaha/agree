import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

import passportConfig from './config/passport.js';
//import bookRoutes from './routes/bookRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Passport config
passportConfig(passport);
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
