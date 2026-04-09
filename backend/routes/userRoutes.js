import express from 'express';
const router = express.Router();
import { authUser, registerUser, getUserProfile, sendOtp, verifyOtp, googleAuth } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/signup', registerUser);
router.post('/login', authUser);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/google', googleAuth);               // ← Google OAuth
router.route('/profile').get(protect, getUserProfile);

export default router;
