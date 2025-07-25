import express from 'express';
import { register, login, getProfile } from '../controllers/userController';
import { validateRequest } from '../middleware/validate';
import { registerSchema, loginSchema } from '../services/userService';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.get('/profile', protect, getProfile);

export default router; 