import User from '../models/User.js';
import Otp from '../models/Otp.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';
import axios from 'axios';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Send OTP to email
// @route   POST /api/auth/send-otp
// @access  Public
const sendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    // Generate a 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        // Remove any existing OTP for this email
        await Otp.deleteMany({ email });

        // Save new OTP
        await Otp.create({ email, otp });

        const message = `Your SHWAG verification code is: ${otp}\nThis code is valid for 5 minutes.`;

        await sendEmail({
            email,
            subject: 'SHWAG - Your Login Verification Code',
            message
        });

        res.status(200).json({ message: 'OTP sent successfully to email' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
};

// @desc    Verify OTP and login/signup
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res) => {
    const { email, otp, name } = req.body;

    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    try {
        const otpRecord = await Otp.findOne({ email, otp });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // OTP is valid. Check if user exists.
        let user = await User.findOne({ email });

        if (!user) {
            // Create user automatically using email prefix as name
            user = await User.create({
                name: req.body.name || email.split('@')[0], 
                email,
                password: Math.random().toString(36).slice(-10), // Random password
            });
        }

        // Delete the used OTP
        await Otp.deleteOne({ _id: otpRecord._id });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Failed to verify OTP' });
    }
};

// @desc    Google OAuth login — verifies Google access token & returns our JWT
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res) => {
    const { access_token } = req.body;
    if (!access_token) return res.status(400).json({ message: 'Google access token is required' });

    try {
        // Ask Google for the user info using the access token
        const googleRes = await axios.get(
            `https://www.googleapis.com/oauth2/v3/userinfo`,
            { headers: { Authorization: `Bearer ${access_token}` } }
        );

        const { email, name, picture, sub: googleId } = googleRes.data;

        if (!email) return res.status(400).json({ message: 'Could not get email from Google' });

        // Find or create the user
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name: name || email.split('@')[0],
                email,
                password: `google_${googleId}_${Math.random().toString(36).slice(-8)}`,
                googleId,
                avatar: picture,
            });
        } else if (!user.googleId) {
            // Link Google to existing email account
            user.googleId = googleId;
            if (picture) user.avatar = picture;
            await user.save();
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Google auth error:', error.response?.data || error.message);
        res.status(401).json({ message: 'Invalid Google token or Google API error' });
    }
};

export { authUser, registerUser, getUserProfile, sendOtp, verifyOtp, googleAuth };
