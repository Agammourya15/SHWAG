import React, { useContext, useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { ShopContext } from '../context/ShopContext.jsx';

function Navbar() {
  const [visible, setVisible] = useState(false);
  const { getCartCount, token, setToken, setUser } = useContext(ShopContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    navigate('/login');
  };

  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isVideoPage = location.pathname === '/' || location.pathname === '/men';
  const isTransparent = isVideoPage && !scrolled;

  const textColorClass = 'text-black';
  const hoverColorClass = 'hover:text-gray-600';
  const activeColorClass = 'text-gray-800';

  return (
    <nav className={`flex items-center justify-between py-5 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] fixed w-full z-50 top-0 transition-all duration-300 ${isTransparent ? 'bg-transparent border-none' : 'bg-white/95 backdrop-blur-md shadow-sm'}`}>

      <div className='flex items-center flex-1'>
        {/* Hamburger Menu (Mobile) */}
        <button onClick={() => setVisible(true)} className={`md:hidden mr-4 ${textColorClass}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>

        <Link to='/'>
          <img src={assets.shwagLogo} alt="SHWAG" className='w-24 md:w-32 transition-all duration-300' />
        </Link>
      </div>

      <ul className='hidden md:flex flex-1 justify-center gap-6 lg:gap-8'>
        <NavLink to='/' className={({ isActive }) => `flex flex-col items-center gap-1 group font-semibold text-sm uppercase tracking-wider ${textColorClass} ${isActive ? activeColorClass : hoverColorClass}`}>
          <p>Home</p>
        </NavLink>
        <NavLink to='/women' className={({ isActive }) => `flex flex-col items-center gap-1 group font-semibold text-sm uppercase tracking-wider ${textColorClass} ${isActive ? activeColorClass : hoverColorClass}`}>
          <p>Women</p>
        </NavLink>
        <NavLink to='/men' className={({ isActive }) => `flex flex-col items-center gap-1 group font-semibold text-sm uppercase tracking-wider ${textColorClass} ${isActive ? activeColorClass : hoverColorClass}`}>
          <p>Men</p>
        </NavLink>
        <NavLink to='/contact' className={({ isActive }) => `flex flex-col items-center gap-1 group font-semibold text-sm uppercase tracking-wider ${textColorClass} ${isActive ? activeColorClass : hoverColorClass}`}>
          <p>Contact Us</p>
        </NavLink>
        <NavLink to='/help' className={({ isActive }) => `flex flex-col items-center gap-1 group font-semibold text-sm uppercase tracking-wider ${textColorClass} ${isActive ? activeColorClass : hoverColorClass}`}>
          <p>Help</p>
        </NavLink>
      </ul>

      <div className={`flex items-center flex-1 justify-end gap-4 md:gap-6 ${textColorClass}`}>

        {/* Profile / Auth */}
        <div className='group relative'>
          <Link to='/login'>
            <svg className={`w-5 h-5 md:w-6 md:h-6 cursor-pointer ${hoverColorClass}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </Link>
          {/* Dropdown if token exists */}
          {token &&
            <div className='group-hover:block hidden absolute right-0 top-full pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-black text-white rounded shadow-xl'>
                <p className='cursor-pointer hover:text-gray-300'>Profile</p>
                <p className='cursor-pointer hover:text-gray-300'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-gray-300'>Logout</p>
              </div>
            </div>}
        </div>

        {/* Cart */}
        <Link to='/cart' className='relative'>
          <svg className={`w-5 h-5 md:w-6 md:h-6 cursor-pointer ${hoverColorClass}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <p className={`absolute right-[-4px] bottom-[-4px] w-4 text-center leading-4 aspect-square rounded-full text-[8px] md:text-[10px] bg-black text-white`}>
            {getCartCount()}
          </p>
        </Link>
      </div>

      {/* Sidebar Menu for Mobile */}
      <div className={`absolute top-0 left-0 bottom-0 overflow-hidden bg-white transition-all h-screen ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-800'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-100 transition'>
            <svg className="h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-200' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-200' to='/women'>WOMEN</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-200' to='/men'>MEN</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-200' to='/contact'>CONTACT US</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-200' to='/help'>HELP</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;