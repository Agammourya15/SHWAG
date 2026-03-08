import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate } = useContext(ShopContext);
  const routerNavigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
        if (response.data.token) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Account created successfully');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        if (response.data.token) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Login successful');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    if (token) {
      routerNavigate('/');
    }
  }, [token, routerNavigate])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 pb-20'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl font-bold uppercase tracking-widest'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className='w-full px-4 py-3 border border-gray-300 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-black'
          placeholder='Full Name'
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className='w-full px-4 py-3 border border-gray-300 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-black'
        placeholder='Email Address'
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className='w-full px-4 py-3 border border-gray-300 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-black'
        placeholder='Password'
        required
      />

      <div className='w-full flex justify-between text-sm mt-2 text-gray-500 font-light'>
        <p className='cursor-pointer hover:text-black'>Forgot your password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer hover:text-black text-black font-medium border-b border-black pb-[2px]'>Create account</p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer hover:text-black text-black font-medium border-b border-black pb-[2px]'>Login Here</p>
        )}
      </div>

      <button className='bg-black text-white font-bold tracking-widest uppercase px-8 py-4 mt-6 w-full shadow-lg hover:bg-gray-800 transition-colors active:scale-[0.98]'>
        {currentState === 'Login' ? 'Sign In' : 'Register'}
      </button>
    </form>
  );
};

export default Login;
