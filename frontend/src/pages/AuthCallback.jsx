import { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';

// This page handles the redirect from Google OAuth (backend strategy)
// It reads the token from the URL query param and saves it.
const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const { setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      setToken(token);
      navigate('/', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-500 tracking-widest uppercase">Signing you in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
