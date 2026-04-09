import React, { useState } from 'react';
import { assets } from '../assets/assets.js';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className='bg-black text-white mt-0'>

      {/* ── Newsletter Banner ──────────────────────────────────────────── */}
      <div className='bg-[#E50010] py-8 px-4 sm:px-8 lg:px-16'>
        <div className='max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5'>
          <div>
            <p className='text-xs font-bold uppercase tracking-[0.25em] text-white/80 mb-1'>Stay in the loop</p>
            <h3 className='text-xl font-bold uppercase tracking-wide text-white'>Join the SHWAG Newsletter</h3>
          </div>
          <form className='flex w-full sm:w-auto sm:min-w-[380px]' onSubmit={e => e.preventDefault()}>
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Enter your email address'
              className='flex-1 bg-white text-black text-xs tracking-widest px-4 py-3.5 focus:outline-none placeholder-gray-400'
            />
            <button className='bg-black text-white text-xs font-bold uppercase tracking-widest px-5 py-3.5 hover:bg-gray-900 transition-colors flex-shrink-0'>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ── Main Footer Content ───────────────────────────────────────── */}
      <div className='max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-14 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10'>

        {/* Column 1: Customer Service */}
        <div>
          <h4 className='text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-5 pb-3 border-b border-gray-800'>
            Customer Service
          </h4>
          <ul className='flex flex-col gap-3'>
            {['Help & FAQ', 'Contact Us', 'Size Guide', 'Track My Order', 'Returns & Refunds', 'Gift Cards'].map(l => (
              <li key={l}>
                <a href='#' className='text-xs text-gray-400 hover:text-white transition-colors tracking-wide font-light'>{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Shop */}
        <div>
          <h4 className='text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-5 pb-3 border-b border-gray-800'>
            Shop
          </h4>
          <ul className='flex flex-col gap-3'>
            {[
              { label: 'Ladies', href: '/women' },
              { label: 'Men', href: '/men' },
              { label: 'New Arrivals', href: '/women' },
              { label: 'Sale', href: '/women' },
            ].map(l => (
              <li key={l.label}>
                <Link to={l.href} className='text-xs text-gray-400 hover:text-white transition-colors tracking-wide font-light'>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: About */}
        <div>
          <h4 className='text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-5 pb-3 border-b border-gray-800'>
            About SHWAG
          </h4>
          <ul className='flex flex-col gap-3'>
            {['About Us', 'Sustainability', 'Careers', 'Press Room', 'Investor Relations'].map(l => (
              <li key={l}>
                <a href='#' className='text-xs text-gray-400 hover:text-white transition-colors tracking-wide font-light'>{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Follow Us */}
        <div>
          <h4 className='text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-5 pb-3 border-b border-gray-800'>
            Follow Us
          </h4>
          <div className='flex gap-4 mb-6'>
            {[
              { icon: <Instagram className='w-5 h-5' />, label: 'Instagram', href: 'https://instagram.com' },
              { icon: <Facebook className='w-5 h-5' />,  label: 'Facebook',  href: 'https://facebook.com' },
              { icon: <Twitter className='w-5 h-5' />,   label: 'Twitter',   href: 'https://twitter.com' },
              { icon: <Youtube className='w-5 h-5' />,   label: 'YouTube',   href: 'https://youtube.com' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target='_blank'
                rel='noreferrer'
                className='text-gray-500 hover:text-white transition-colors'
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className='text-xs text-gray-500 font-light leading-relaxed tracking-wide'>
            SHWAG is the premium destination for modern fashion. Style for everyone.
          </p>
          <div className='mt-6'>
            <img src={assets.shwagLogo} alt='SHWAG' className='h-8 w-auto invert opacity-40' />
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ─────────────────────────────────────────────────── */}
      <div className='border-t border-gray-800'>
        <div className='max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p className='text-[11px] text-gray-600 tracking-widest font-light'>
            © 2026 SHWAG Fashion. All rights reserved.
          </p>
          <div className='flex gap-5'>
            {['Privacy Policy', 'Terms of Use', 'Cookie Settings'].map(l => (
              <a key={l} href='#' className='text-[11px] text-gray-600 hover:text-white transition-colors tracking-wide'>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
