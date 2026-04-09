import React from 'react';
import { Link } from 'react-router-dom';

// Beauty product images
import lipsEssentials from '../assets/beauty Products/Lips Essentials.avif';
import makeUpFavs from '../assets/beauty Products/make Up favs.avif';
import beautyMakeUpBags from '../assets/beauty Products/Beauty make Up Bags.avif';
import mysticVelvet from '../assets/beauty Products/MYSTIC VELVET.avif';
import pearlDream from '../assets/beauty Products/PERAL DREAM EDP.avif';
import rubyTouch from '../assets/beauty Products/RUBY TOUCH EDP.avif';
import whiteAir from '../assets/beauty Products/WHITE AIR.avif';
import whiteAir2 from '../assets/beauty Products/White Air EDP2.avif';
import faceRoller from '../assets/beauty Products/Face roller.avif';
import buffingBrush from '../assets/beauty Products/Buffing foundation brush.avif';
import dipLiner from '../assets/beauty Products/Dipliner Ink liquid eyeliner.avif';
import doItAll from '../assets/beauty Products/Do-It-All-Stick Highlighter.avif';
import glowPro from '../assets/beauty Products/Glow Pro highlighter.avif';
import hairCurler from '../assets/beauty Products/Hair curler set.avif';
import madMatte from '../assets/beauty Products/Mad For Matte liquid lipstick.avif';
import makeItEasy from '../assets/beauty Products/Make It Easy eyeshadow pen.avif';
import nailPolish from '../assets/beauty Products/Nail polish.avif';
import nailKit from '../assets/beauty Products/Nail travel kit.avif';
import satinLipstick from '../assets/beauty Products/Satin Icon lipstick.avif';
import silkBow from '../assets/beauty Products/Silk bow scrunchie.avif';
import silkPremium from '../assets/beauty Products/Silk scrunchie permium.avif';
import silk2 from '../assets/beauty Products/Silk scrunchie2.avif';
import silk4 from '../assets/beauty Products/Silk scrunchie4.avif';
import pack2 from '../assets/beauty Products/2-pack Silk scrunchie.avif';
import pack3 from '../assets/beauty Products/3-pack Silk scrunchie.avif';
import pack4 from '../assets/beauty Products/4-pack Silk scrunchie.avif';

const newInProducts = [
  { name: 'Mystic Velvet EDP', img: mysticVelvet, price: '₹2,999' },
  { name: 'Pearl Dream EDP', img: pearlDream, price: '₹3,499' },
  { name: 'Ruby Touch EDP', img: rubyTouch, price: '₹2,799' },
  { name: 'Satin Icon Lipstick', img: satinLipstick, price: '₹599' },
  { name: 'Mad For Matte Liquid Lipstick', img: madMatte, price: '₹649' },
  { name: 'Buffing Foundation Brush', img: buffingBrush, price: '₹799' },
  { name: 'Face Roller', img: faceRoller, price: '₹999' },
  { name: 'Hair Curler Set', img: hairCurler, price: '₹1,299' },
  { name: 'Nail Polish', img: nailPolish, price: '₹299' },
  { name: 'Nail Travel Kit', img: nailKit, price: '₹799' },
  { name: 'Silk Bow Scrunchie', img: silkBow, price: '₹399' },
  { name: '2-Pack Silk Scrunchie', img: pack2, price: '₹499' },
];

const makeupFavsProducts = [
  { name: 'Dipliners Ink Liquid Eyeliner', img: dipLiner, price: '₹549' },
  { name: 'Glow Pro Highlighter', img: glowPro, price: '₹699' },
  { name: 'Do-It-All Stick Highlighter', img: doItAll, price: '₹649' },
  { name: 'Make It Easy Eyeshadow Pen', img: makeItEasy, price: '₹599' },
  { name: 'White Air EDP', img: whiteAir, price: '₹2,499' },
  { name: '3-Pack Silk Scrunchie', img: pack3, price: '₹649' },
];

export default function Beauty() {
  return (
    <div className="pt-[100px] bg-white min-h-screen">

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: '70vh', maxHeight: '600px' }}>
        <img
          src={makeUpFavs}
          alt="Beauty Campaign"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-3 opacity-80">New Season</p>
          <h1 className="text-5xl md:text-7xl font-thin uppercase tracking-[0.15em] mb-5">Beauty</h1>
          <Link
            to="/beauty/all"
            className="border border-white text-white text-xs font-semibold uppercase tracking-[0.2em] px-8 py-3 hover:bg-white hover:text-black transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* ── Category Tiles ───────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-10">

        {/* Row 1: Lip Essentials + Beauty & Makeup Bags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Lip Essentials */}
          <Link to="/beauty/lip-essentials" className="group relative overflow-hidden block">
            <div className="aspect-[4/3] overflow-hidden bg-[#f5ede8]">
              <img
                src={lipsEssentials}
                alt="Lip Essentials"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-black bg-white/90 backdrop-blur-sm px-3 py-1">
                Lip Essentials
              </span>
              <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-lg group-hover:bg-[#E50010] transition-colors duration-300">→</span>
            </div>
          </Link>

          {/* Beauty & Makeup Bags */}
          <Link to="/beauty/bags" className="group relative overflow-hidden block">
            <div className="aspect-[4/3] overflow-hidden bg-[#e8edf5]">
              <img
                src={beautyMakeUpBags}
                alt="Beauty and Makeup Bags"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-black bg-white/90 backdrop-blur-sm px-3 py-1">
                Beauty & Makeup Bags
              </span>
              <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-lg group-hover:bg-[#E50010] transition-colors duration-300">→</span>
            </div>
          </Link>
        </div>

        {/* Row 2: Fragrance + Skincare Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fragrance */}
          <Link to="/beauty/fragrance" className="group relative overflow-hidden block">
            <div className="aspect-[4/3] overflow-hidden bg-[#1a1a2e]">
              <img
                src={mysticVelvet}
                alt="Fragrance"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-1">Fragrance</p>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#E50010]">Explore</p>
            </div>
          </Link>

          {/* Skincare Tools */}
          <Link to="/beauty/skincare" className="group relative overflow-hidden block">
            <div className="aspect-[4/3] overflow-hidden bg-[#e8f0ed]">
              <img
                src={faceRoller}
                alt="Skincare Tools"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-black mb-1">Skincare Tools</p>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#E50010]">Explore</p>
            </div>
          </Link>
        </div>
      </div>

      {/* ── New In ──────────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 pb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-black">New In</h2>
          <Link to="/beauty" className="text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-black flex items-center gap-1 transition-colors">
            View All <span>→</span>
          </Link>
        </div>
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-3" style={{ width: 'max-content' }}>
            {newInProducts.map((p, i) => (
              <div key={i} className="group flex-shrink-0 w-44 cursor-pointer">
                <div className="w-44 h-52 bg-[#f7f4f1] overflow-hidden mb-2">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-xs text-gray-700 font-medium leading-tight mb-0.5 line-clamp-2">{p.name}</p>
                <p className="text-xs font-bold text-black">{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Make-Up Faves ───────────────────────────────────── */}
      <div className="border-t border-gray-100 max-w-screen-xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-black">Make-Up Faves</h2>
          <Link to="/beauty/makeup" className="text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-black flex items-center gap-1 transition-colors">
            View All <span>→</span>
          </Link>
        </div>
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-3" style={{ width: 'max-content' }}>
            {makeupFavsProducts.map((p, i) => (
              <div key={i} className="group flex-shrink-0 w-44 cursor-pointer">
                <div className="w-44 h-52 bg-[#f7f4f1] overflow-hidden mb-2">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-xs text-gray-700 font-medium leading-tight mb-0.5 line-clamp-2">{p.name}</p>
                <p className="text-xs font-bold text-black">{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ──────────────────────────────────────── */}
      <div className="border-t border-gray-100 py-4 px-4 sm:px-8 max-w-screen-xl mx-auto">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          {' / '}
          <span className="text-black">Beauty</span>
        </p>
      </div>
    </div>
  );
}
