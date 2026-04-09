import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL 
  ? `${import.meta.env.VITE_BACKEND_URL}/api/auth` 
  : 'http://localhost:5000/api/auth';

const Login = () => {
  const [currentState, setCurrentState] = useState('Email');
  const { token, setToken, setUser } = useContext(ShopContext);
  const routerNavigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName]   = useState('');
  const [otp, setOtp]     = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  // ─── Google Login ────────────────────────────────────────────────────────────
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      try {
        // Send the Google access token to our backend to verify & get a JWT
        const res = await axios.post(`${API_BASE_URL}/google`, {
          access_token: tokenResponse.access_token,
        });
        if (res.data.token) {
          const { token: jwt, ...userData } = res.data;
          localStorage.setItem('token', jwt);
          setToken(jwt);
          setUser(userData);   // store clean user object without token
          toast.success(`Welcome, ${userData.name}! 👋`);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Google sign-in failed. Try again.');
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => {
      toast.error('Google sign-in was cancelled or failed.');
    },
  });

  // ─── OTP Flow ────────────────────────────────────────────────────────────────
  const sendOtpHandler = async (e) => {
    e.preventDefault();
    if (!email) { toast.error('Please enter a valid email'); return; }
    try {
      const res = await axios.post(`${API_BASE_URL}/send-otp`, { email });
      if (res.status === 200) {
        toast.success('Verification code sent to your email!');
        setCurrentState('OTP');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send verification code');
    }
  };

  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) { toast.error('Please enter a valid 6-digit code'); return; }
    try {
      const res = await axios.post(`${API_BASE_URL}/verify-otp`, { email, otp, name });
      if (res.data.token) {
        const { token: jwt, ...userData } = res.data;
        localStorage.setItem('token', jwt);
        setToken(jwt);
        setUser(userData);   // store clean user object without token
        toast.success(`Welcome back, ${userData.name}! 👋`);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid or expired code');
    }
  };

  useEffect(() => {
    if (token) routerNavigate('/');
  }, [token, routerNavigate]);

  return (
    <div className='min-h-screen bg-white flex pt-[88px]'>
      <div className='flex-1 flex flex-col items-center justify-center px-4 py-16'>

        {/* Brand mark */}
        <div className='mb-10 text-center'>
          <p className='text-[11px] font-bold tracking-[0.35em] uppercase text-gray-400 mb-2'>SHWAG</p>
          <h1 className='text-3xl font-bold uppercase tracking-wide text-black'>
            Sign in or Join
          </h1>
          <div className='w-10 h-0.5 bg-[#E50010] mx-auto mt-3' />
        </div>

        {currentState === 'Email' ? (
          <div className='w-full max-w-sm flex flex-col gap-4'>
            <p className='text-sm text-center text-gray-500 mb-2'>
              Enter your email to receive a secure login code. No password needed.
            </p>

            <form onSubmit={sendOtpHandler} className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <label className='text-[11px] font-bold uppercase tracking-widest text-gray-700'>Full Name</label>
                <input
                  id='login-name'
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder='Your Name'
                  required
                  className='w-full border-b-2 border-gray-300 focus:border-black focus:outline-none py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-transparent transition-colors'
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-[11px] font-bold uppercase tracking-widest text-gray-700'>Email Address</label>
                <input
                  id='login-email'
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='your@email.com'
                  required
                  className='w-full border-b-2 border-gray-300 focus:border-black focus:outline-none py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-transparent transition-colors'
                />
              </div>

              <button id='send-otp-btn' type='submit' className='hm-btn-red w-full text-center mt-2 py-4'>
                Continue with Email
              </button>
            </form>

            {/* Divider */}
            <div className='flex items-center gap-3 my-1'>
              <hr className='flex-1 border-gray-200' />
              <span className='text-[11px] text-gray-400 uppercase tracking-widest'>or</span>
              <hr className='flex-1 border-gray-200' />
            </div>

            {/* ── Google Sign-In Button ── */}
            <button
              id='google-signin-btn'
              type='button'
              onClick={() => googleLogin()}
              disabled={googleLoading}
              className='w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm py-3.5 rounded-none transition-all duration-200 tracking-wide disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {googleLoading ? (
                <span className='w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin' />
              ) : (
                /* Official Google "G" SVG */
                <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
              )}
              {googleLoading ? 'Signing in...' : 'Continue with Google'}
            </button>

            <button
              type='button'
              onClick={() => routerNavigate('/')}
              className='hm-btn-white w-full text-center py-3 text-xs'
            >
              Continue as Guest
            </button>
          </div>

        ) : (
          <form onSubmit={verifyOtpHandler} className='w-full max-w-sm flex flex-col gap-4'>
            <p className='text-sm text-center text-gray-500 mb-2'>
              We sent a 6-digit code to <br/>
              <span className='font-bold text-black'>{email}</span>
            </p>

            <div className='flex flex-col gap-1 mt-4'>
              <label className='text-[11px] font-bold uppercase tracking-widest text-gray-700 text-center'>
                Verification Code
              </label>
              <input
                id='otp-input'
                type='text'
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder='000000'
                required
                className='w-full border-b-2 border-gray-300 focus:border-black focus:outline-none py-4 text-2xl text-center text-gray-900 tracking-[0.5em] placeholder-gray-300 bg-transparent transition-colors'
              />
            </div>

            <button id='verify-otp-btn' type='submit' className='hm-btn-red w-full text-center mt-6 py-4'>
              Verify &amp; Sign In
            </button>

            <div className='text-center mt-4'>
              <button 
                type='button' 
                onClick={() => setCurrentState('Email')} 
                className='text-xs font-bold text-black hover:text-[#E50010] transition-colors uppercase tracking-widest underline underline-offset-4'
              >
                Use a different email
              </button>
            </div>
          </form>
        )}

        {/* T&C note */}
        <p className='text-[11px] text-gray-400 text-center mt-12 max-w-xs leading-relaxed tracking-wide'>
          By continuing, you agree to SHWAG's{' '}
          <span className='underline cursor-pointer hover:text-black'>Terms of Service</span> and{' '}
          <span className='underline cursor-pointer hover:text-black'>Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;
