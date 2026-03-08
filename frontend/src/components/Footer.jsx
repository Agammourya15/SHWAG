import React from 'react';
import { assets } from '../assets/assets.js';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

                {/* Brand Section */}
                <div className="flex flex-col gap-4 items-center md:items-start">
                    <img src={assets.shwagLogo} alt="SHWAG Logo" className="w-32 invert" />
                    <p className="text-sm font-light text-gray-400 mt-2 max-w-sm">
                        SHWAG is the premium destination for modern fashion. Discover your style with our exclusive top-tier collections.
                    </p>
                </div>

                {/* Customer Service & Contact Info */}
                <div className="flex flex-col gap-2">
                    <h3 className="uppercase tracking-widest text-lg font-semibold mb-2">Customer Service</h3>
                    <ul className="flex flex-col gap-2 text-sm font-light text-gray-400">
                        <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
                    </ul>
                    <h3 className="uppercase tracking-widest text-lg font-semibold mt-4 mb-2">Reach Out</h3>
                    <p className="text-sm font-light text-gray-400">Phone: +91 9876543210</p>
                    <p className="text-sm font-light text-gray-400">Email: support@shwag.com</p>
                </div>

                {/* Social Media */}
                <div className="flex flex-col gap-2">
                    <h3 className="uppercase tracking-widest text-lg font-semibold mb-2">Follow Us</h3>
                    <ul className="flex flex-col gap-2 text-sm font-light text-gray-400">
                        <li><a href="https://facebook.com/shwagofficial" target="_blank" rel="noreferrer" className="hover:text-white cursor-pointer transition-colors flex items-center justify-center md:justify-start gap-2">Facebook</a></li>
                        <li><a href="https://twitter.com/shwagfashion" target="_blank" rel="noreferrer" className="hover:text-white cursor-pointer transition-colors flex items-center justify-center md:justify-start gap-2">Twitter</a></li>
                        <li className="hover:text-white cursor-pointer transition-colors mt-4">Instagram</li>
                    </ul>
                </div>

            </div>

            <div className="mt-16 pt-8 border-t border-gray-800 text-center flex flex-col items-center">
                <p className="text-xs text-gray-500 font-light tracking-wide">
                    © 2026 SHWAG. All rights reserved. Premium Fashion Store.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
