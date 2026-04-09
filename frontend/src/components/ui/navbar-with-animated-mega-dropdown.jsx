import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext.jsx';
import { assets } from '../../assets/assets.js';
import { Sheet, SheetContent, SheetTrigger } from './sheet.jsx';
import { Menu, Search, ShoppingBag, User, X, ChevronRight } from 'lucide-react';

// ─── Mega Menu Data ────────────────────────────────────────────────────────────

const womenDropdown = [
  {
    heading: 'Clothing',
    links: [
      { text: 'All Women', href: '/women' },
      { text: 'Dresses', href: '/women?cat=Dresses' },
      { text: 'Trousers', href: '/women?cat=Trousers' },
      { text: 'Topwear', href: '/women?cat=Topwear' },
    ],
  },
  {
    heading: 'New In',
    links: [
      { text: 'New Arrivals', href: '/women' },
      { text: 'Best Sellers', href: '/women' },
      { text: 'Sale', href: '/women' },
    ],
  },
  {
    heading: 'Collections',
    links: [
      { text: 'Summer Edit', href: '/women' },
      { text: 'Work Wear', href: '/women' },
      { text: 'Evening', href: '/women' },
    ],
  },
];

const menDropdown = [
  {
    heading: 'Clothing',
    links: [
      { text: 'All Men', href: '/men' },
      { text: 'Jackets', href: '/men?cat=Jackets' },
      { text: 'Shorts', href: '/men?cat=Shorts' },
      { text: 'Running', href: '/men?cat=Running' },
      { text: 'Winterwear', href: '/men?cat=Winterwear' },
    ],
  },
  {
    heading: 'New In',
    links: [
      { text: 'New Arrivals', href: '/men' },
      { text: 'Best Sellers', href: '/men' },
      { text: 'Sale', href: '/men' },
    ],
  },
  {
    heading: 'Collections',
    links: [
      { text: 'Athleisure', href: '/men' },
      { text: 'Smart Casual', href: '/men' },
      { text: 'Outerwear', href: '/men' },
    ],
  },
];

const beautyDropdown = [
  {
    heading: 'Shop By Category',
    links: [
      { text: 'All Beauty', href: '/beauty' },
      { text: 'Lip Essentials', href: '/beauty/lip-essentials' },
      { text: 'Make-Up Faves', href: '/beauty/makeup' },
      { text: 'Fragrance', href: '/beauty/fragrance' },
    ],
  },
  {
    heading: 'Accessories',
    links: [
      { text: 'Beauty & Makeup Bags', href: '/beauty/bags' },
      { text: 'Skincare Tools', href: '/beauty/skincare' },
      { text: 'Silk Scrunchies', href: '/beauty' },
    ],
  },
  {
    heading: 'New In',
    links: [
      { text: 'New Arrivals', href: '/beauty' },
      { text: 'Best Sellers', href: '/beauty' },
      { text: 'Gift Sets', href: '/beauty' },
    ],
  },
];

const menuItems = [
  { label: 'Ladies', href: '/women', dropdownData: womenDropdown },
  { label: 'Men', href: '/men', dropdownData: menDropdown },
  { label: 'Beauty', href: '/beauty', dropdownData: beautyDropdown },
  { label: 'New Arrivals', href: '/women' },
  { label: 'Sale', href: '/women', isRed: true },
  { label: 'Help', href: '/help' },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const containerVariants = {
  closed: { opacity: 0, y: -8, pointerEvents: 'none' },
  open:   { opacity: 1, y: 0,  pointerEvents: 'auto' },
};

const mobileDropdownVariants = {
  closed: { height: 0, opacity: 0 },
  open:   { height: 'auto', opacity: 1 },
};

// ─── Component ────────────────────────────────────────────────────────────────

export const MegaDropdownNavbar = () => {
  const { getCartCount, token, setToken, setUser } = useContext(ShopContext);
  const navigate  = useNavigate();
  const location  = useLocation();

  // Promo bar
  const [promoVisible, setPromoVisible] = useState(true);

  // Search bar
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Desktop mega dropdown
  const [activeIndex, setActiveIndex]     = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeTimeout = useRef(null);

  const openDropdown  = (i) => { clearTimeout(closeTimeout.current); setActiveIndex(i); setIsDropdownOpen(true); };
  const closeDropdown = ()  => { closeTimeout.current = setTimeout(() => { setIsDropdownOpen(false); setActiveIndex(null); }, 150); };
  const cancelClose   = ()  => clearTimeout(closeTimeout.current);

  // Mobile menu
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    navigate('/login');
  };

  const promoBannerHeight = promoVisible ? '32px' : '0px';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* ── 1. Promo Bar ─────────────────────────────────────────────────── */}
      <div
        className="bg-black text-white text-xs text-center font-medium tracking-widest uppercase overflow-hidden transition-all duration-300 flex items-center justify-center relative"
        style={{ height: promoBannerHeight }}
      >
        <span>Free delivery on orders above ₹499 &nbsp;|&nbsp; Easy 14-day returns</span>
        <button
          onClick={() => setPromoVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
          aria-label="Close promo bar"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* ── 2. Logo + Search + Icons Row ─────────────────────────────────── */}
      <div className="border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">

          {/* Mobile hamburger */}
          <div className="flex lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="p-1.5 text-black hover:text-gray-600" aria-label="Open menu">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] pt-0 overflow-y-auto bg-white p-0">
                {/* Mobile sheet header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                  <Link to="/" onClick={() => setMobileOpen(false)}>
                    <img src={assets.shwagLogo} alt="SHWAG" className="h-8 w-auto" />
                  </Link>
                  <button onClick={() => setMobileOpen(false)} className="text-black p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col text-gray-900">
                  {menuItems.map((item, i) => (
                    <div key={i} className="border-b border-gray-100">
                      {item.dropdownData ? (
                        <>
                          <button
                            className="flex justify-between items-center w-full text-left py-3.5 px-5 text-sm font-semibold uppercase tracking-widest hover:bg-gray-50"
                            onClick={() => setMobileAccordion(mobileAccordion === i ? null : i)}
                          >
                            <span className={item.isRed ? 'text-[#E50010]' : ''}>{item.label}</span>
                            <ChevronRight className={`w-4 h-4 transition-transform duration-200 text-gray-400 ${mobileAccordion === i ? 'rotate-90' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {mobileAccordion === i && (
                              <motion.div
                                initial="closed" animate="open" exit="closed"
                                variants={mobileDropdownVariants}
                                transition={{ duration: 0.22, ease: 'easeInOut' }}
                                className="overflow-hidden bg-gray-50"
                              >
                                {item.dropdownData.map((col, ci) => (
                                  <div key={ci} className="px-5 pt-3 pb-2">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{col.heading}</p>
                                    {col.links.map((link, li) => (
                                      <Link
                                        key={li} to={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="block py-1.5 text-sm text-gray-700 hover:text-black"
                                      >
                                        {link.text}
                                      </Link>
                                    ))}
                                  </div>
                                ))}
                                <div className="h-2" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <NavLink
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block py-3.5 px-5 text-sm font-semibold uppercase tracking-widest hover:bg-gray-50 ${item.isRed ? 'text-[#E50010]' : 'text-gray-900'}`}
                        >
                          {item.label}
                        </NavLink>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Mobile auth */}
                <div className="px-5 mt-5 flex flex-col gap-3">
                  {token ? (
                    <button onClick={() => { logout(); setMobileOpen(false); }} className="hm-btn-black w-full">Log Out</button>
                  ) : (
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="hm-btn-black text-center w-full block">Sign In</Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mr-auto lg:mr-0">
            <img src={assets.shwagLogo} alt="SHWAG" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Search bar – centered on desktop */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8 relative">
            <div className="flex items-center w-full border border-gray-300 bg-gray-50 px-4 py-2.5 focus-within:border-black focus-within:bg-white transition-colors">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 bg-transparent text-sm text-gray-800 pl-3 focus:outline-none placeholder-gray-400 tracking-wide"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-black ml-2">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1 ml-auto lg:ml-0">
            {/* Mobile search */}
            <button
              className="lg:hidden p-2 text-black hover:text-gray-600"
              aria-label="Search"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User */}
            <div className="group relative">
              <Link to="/login" aria-label="Account" className="p-2 text-black hover:text-gray-600 flex items-center gap-1.5">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline text-xs font-semibold uppercase tracking-widest">Sign In</span>
              </Link>
              {token && (
                <div className="group-hover:block hidden absolute right-0 top-full pt-2 z-10 min-w-[160px]">
                  <div className="flex flex-col bg-white border border-gray-200 shadow-xl py-2">
                    <Link to="/profile" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer tracking-wide block">My Profile</Link>
                    <Link to="/profile" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer tracking-wide block">My Orders</Link>
                    <hr className="border-gray-100 my-1" />
                    <p onClick={logout} className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer tracking-wide">Log Out</p>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-black hover:text-gray-600 flex items-center gap-1.5" aria-label="Cart">
              <ShoppingBag className="w-5 h-5" />
              {getCartCount() > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 flex items-center justify-center text-[9px] font-bold bg-[#E50010] text-white">
                  {getCartCount()}
                </span>
              )}
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-widest">
                ({getCartCount()})
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile search bar (slideable) */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden lg:hidden border-t border-gray-100"
            >
              <div className="px-4 py-2.5 flex items-center gap-3 bg-gray-50">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search for products..."
                  className="flex-1 bg-transparent text-sm text-gray-900 focus:outline-none placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')}><X className="w-4 h-4 text-gray-400" /></button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 3. Category Nav Row ───────────────────────────────────────────── */}
      <div
        className="border-b border-gray-200 bg-white hidden lg:block"
        onMouseLeave={closeDropdown}
      >
        <ul className="max-w-screen-2xl mx-auto px-8 flex items-center gap-0 list-none h-11">
          {menuItems.map((item, i) => (
            <li
              key={i}
              className="h-full relative flex items-center"
              onMouseEnter={() => item.dropdownData ? openDropdown(i) : closeDropdown()}
            >
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `px-5 h-full flex items-center text-xs font-semibold uppercase tracking-widest transition-colors border-b-2 ${
                    item.isRed
                      ? 'text-[#E50010] border-transparent hover:border-[#E50010]'
                      : isActive
                        ? 'text-black border-black'
                        : 'text-gray-700 border-transparent hover:text-black hover:border-gray-300'
                  } ${activeIndex === i && isDropdownOpen ? 'border-black text-black' : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          {/* Extra links */}
          <li className="h-full flex items-center ml-auto">
            <Link to="/contact" className="px-5 h-full flex items-center text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-black transition-colors border-b-2 border-transparent">
              Contact
            </Link>
          </li>
        </ul>

        {/* ── Desktop Mega Dropdown ─────────────────────────────────────── */}
        <AnimatePresence>
          {isDropdownOpen && activeIndex !== null && menuItems[activeIndex]?.dropdownData && (
            <motion.div
              key="mega-container"
              className="absolute left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-40"
              initial="closed" animate="open" exit="closed"
              variants={containerVariants}
              transition={{ duration: 0.18 }}
              onMouseEnter={cancelClose}
              onMouseLeave={closeDropdown}
            >
              <div className="max-w-screen-2xl mx-auto px-8 py-8 flex gap-16">
                {/* Section heading */}
                <div className="min-w-[180px]">
                  <Link
                    to={menuItems[activeIndex].href}
                    onClick={closeDropdown}
                    className="text-xl font-bold uppercase tracking-widest text-black hover:text-gray-600 block mb-2"
                  >
                    {menuItems[activeIndex].label}
                  </Link>
                  <Link
                    to={menuItems[activeIndex].href}
                    onClick={closeDropdown}
                    className="text-xs font-semibold uppercase tracking-widest text-[#E50010] hover:underline"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-10 flex-1">
                  {menuItems[activeIndex].dropdownData.map((col, ci) => (
                    <div key={ci}>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-100">
                        {col.heading}
                      </p>
                      <ul className="space-y-2">
                        {col.links.map((link, li) => (
                          <li key={li}>
                            <Link
                              to={link.href}
                              onClick={closeDropdown}
                              className="text-sm text-gray-700 hover:text-black font-medium transition-colors tracking-wide"
                            >
                              {link.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default MegaDropdownNavbar;
