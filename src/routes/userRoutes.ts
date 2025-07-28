import express from 'express';
import { register, login, getProfile } from '../controllers/userController';
import { validateRequest } from '../middleware/validate';
import { registerSchema, loginSchema } from '../services/userService';
import { protect } from '../middleware/auth';
import { getAllUserDataLogs } from '../controllers/userDataLogController';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.get('/profile', protect, getProfile);
router.get('/user-data-logs', getAllUserDataLogs);

export default router; 