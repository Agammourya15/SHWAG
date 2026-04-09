import React, { useContext, useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { ShopContext } from '../context/ShopContext.jsx';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet.jsx';
import { Menu } from 'lucide-react';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getCartCount, token, setToken, user, setUser } = useContext(ShopContext);
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
    <nav className={`relative flex items-center h-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] fixed w-full z-50 top-0 transition-all duration-300 ${isTransparent ? 'bg-transparent border-none' : 'bg-white/95 backdrop-blur-md shadow-sm'}`}>

      {/* ── Mobile hamburger (absolute left) ── */}
      <div className='md:hidden absolute left-4 top-1/2 -translate-y-1/2'>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button className={`${isTransparent ? 'text-white' : 'text-black'} p-1`} aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] pt-12">
            <div className="flex flex-col gap-0 text-gray-800">
              {[
                { to: '/', label: 'HOME' },
                { to: '/women', label: 'WOMEN' },
                { to: '/men', label: 'MEN' },
                { to: '/contact', label: 'CONTACT US' },
                { to: '/help', label: 'HELP' },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `py-4 pl-6 border-b border-gray-200 uppercase tracking-widest text-sm font-semibold hover:bg-gray-50 transition-colors ${isActive ? 'text-black' : 'text-gray-700'}`
                  }
                  to={to}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* ── Logo: centered on mobile, left on desktop ── */}
      <div className='flex flex-1 md:flex-none items-center justify-center md:justify-start'>
        <Link to='/'>
          <img
            src={assets.shwagLogo}
            alt="SHWAG"
            className='h-12 md:h-14 w-auto transition-all duration-300'
          />
        </Link>
      </div>

      {/* ── Desktop nav links (centered) ── */}
      <ul className='hidden md:flex flex-1 justify-center gap-6 lg:gap-8'>
        {[
          { to: '/', label: 'Home' },
          { to: '/women', label: 'Women' },
          { to: '/men', label: 'Men' },
          { to: '/contact', label: 'Contact Us' },
          { to: '/help', label: 'Help' },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `font-semibold text-sm uppercase tracking-wider transition-colors ${
                isTransparent
                  ? isActive ? 'text-white' : 'text-white/80 hover:text-white'
                  : isActive ? 'text-black' : 'text-gray-600 hover:text-black'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </ul>

      {/* ── Icons: absolute right on mobile, flex right on desktop ── */}
      <div className={`absolute right-4 top-1/2 -translate-y-1/2 md:static md:translate-y-0 md:flex-none flex items-center gap-4 md:gap-5 ${isTransparent ? 'text-white' : 'text-black'}`}>

        {/* Profile / Auth */}
        <div className='group relative flex items-center'>
          {token ? (
            /* ── LOGGED IN: show avatar circle with user initial ── */
            <button className='flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-bold uppercase cursor-pointer hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black'>
              {user?.name ? user.name.charAt(0) : user?.email ? user.email.charAt(0) : 'U'}
            </button>
          ) : (
            /* ── LOGGED OUT: show person icon + SIGN IN text ── */
            <Link to='/login' className='flex items-center gap-1.5 hover:opacity-70 transition-opacity'>
              <svg className="w-5 h-5 cursor-pointer" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <span className='hidden sm:block text-xs font-semibold tracking-wider'>SIGN IN</span>
            </Link>
          )}

          {/* ── Dropdown (visible only when logged in, on hover) ── */}
          {token && (
            <div className='group-hover:block hidden absolute right-0 top-full pt-3 z-10'>
              <div className='flex flex-col gap-1 w-44 py-3 px-0 bg-white text-gray-800 rounded-lg shadow-2xl border border-gray-100'>
                {/* User name/email header */}
                {(user?.name || user?.email) && (
                  <div className='px-4 pb-2 mb-1 border-b border-gray-100'>
                    <p className='text-xs font-bold text-black truncate'>{user?.name || ''}</p>
                    <p className='text-[10px] text-gray-400 truncate'>{user?.email || ''}</p>
                  </div>
                )}
                <Link to='/profile' className='flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors'>
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  My Profile
                </Link>
                <Link to='/orders' className='flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors'>
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
                  </svg>
                  My Orders
                </Link>
                <div className='mx-3 border-t border-gray-100 my-1' />
                <button onClick={logout} className='flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left'>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to='/cart' className='relative'>
          <svg className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <span className='absolute -right-1.5 -bottom-1.5 w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold bg-black text-white'>
            {getCartCount()}
          </span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;

