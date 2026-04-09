import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// All 26 beauty products
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

const allProducts = [
  // Lips & Makeup
  { id: 'b-001', name: 'Satin Icon Lipstick', desc: 'Rich satin colour finish', price: 599, img: satinLipstick, tag: 'Bestseller', cat: 'Lips' },
  { id: 'b-002', name: 'Mad For Matte Liquid Lipstick', desc: 'Intense all-day matte', price: 649, img: madMatte, tag: 'New', cat: 'Lips' },
  { id: 'b-003', name: 'Do-It-All Stick Highlighter', desc: 'Multi-use eyes, cheeks & lips', price: 649, img: doItAll, tag: null, cat: 'Makeup' },
  { id: 'b-004', name: 'Make It Easy Eyeshadow Pen', desc: 'Precision shadow in a pen', price: 599, img: makeItEasy, tag: null, cat: 'Makeup' },
  { id: 'b-005', name: 'Dipliner Ink Liquid Eyeliner', desc: 'Ultra-fine smudge-free liner', price: 549, img: dipLiner, tag: 'Trending', cat: 'Makeup' },
  { id: 'b-006', name: 'Glow Pro Highlighter', desc: 'Buildable luminous glow', price: 699, img: glowPro, tag: null, cat: 'Makeup' },
  { id: 'b-007', name: 'Buffing Foundation Brush', desc: 'Flawless airbrushed finish', price: 799, img: buffingBrush, tag: null, cat: 'Tools' },
  { id: 'b-008', name: 'Lip Essentials Gift Set', desc: 'Curated lip essentials set', price: 1499, img: lipsEssentials, tag: 'Gift Set', cat: 'Lips' },
  { id: 'b-009', name: 'Make-Up Faves Collection', desc: 'Must-have makeup icons', price: 2499, img: makeUpFavs, tag: 'Collection', cat: 'Makeup' },
  // Fragrance
  { id: 'b-010', name: 'Mystic Velvet EDP', desc: 'Black plum · Sandalwood · Amber', price: 2999, img: mysticVelvet, tag: 'Bestseller', cat: 'Fragrance' },
  { id: 'b-011', name: 'Pearl Dream EDP', desc: 'Peony · White Cedar · Soft Musk', price: 3499, img: pearlDream, tag: 'New', cat: 'Fragrance' },
  { id: 'b-012', name: 'Ruby Touch EDP', desc: 'Bergamot · Rose · Oud', price: 2799, img: rubyTouch, tag: 'Trending', cat: 'Fragrance' },
  { id: 'b-013', name: 'White Air EDP', desc: 'White Tea · Lotus · Cedarwood', price: 2499, img: whiteAir, tag: null, cat: 'Fragrance' },
  { id: 'b-014', name: 'White Air Intense EDP', desc: 'White Tea · Jasmine · Musk', price: 2799, img: whiteAir2, tag: 'Limited', cat: 'Fragrance' },
  // Skincare Tools
  { id: 'b-015', name: 'Face Roller', desc: 'Depuff and sculpt with ease', price: 999, img: faceRoller, tag: null, cat: 'Tools' },
  { id: 'b-016', name: 'Hair Curler Set', desc: 'Heatless overnight curls', price: 1299, img: hairCurler, tag: null, cat: 'Tools' },
  { id: 'b-017', name: 'Nail Travel Kit', desc: 'Complete manicure on the go', price: 799, img: nailKit, tag: null, cat: 'Tools' },
  { id: 'b-018', name: 'Nail Polish', desc: 'High-shine chip-resistant formula', price: 299, img: nailPolish, tag: null, cat: 'Nails' },
  // Bags
  { id: 'b-019', name: 'Beauty & Makeup Bag', desc: 'Spacious textured makeup organiser', price: 1199, img: beautyMakeUpBags, tag: null, cat: 'Bags' },
  // Scrunchies
  { id: 'b-020', name: 'Silk Bow Scrunchie', desc: 'Gentle silk with a chic bow', price: 399, img: silkBow, tag: null, cat: 'Accessories' },
  { id: 'b-021', name: 'Silk Scrunchie Premium', desc: 'Premium pure silk finish', price: 549, img: silkPremium, tag: null, cat: 'Accessories' },
  { id: 'b-022', name: 'Silk Scrunchie 2', desc: 'Everyday silk essential', price: 399, img: silk2, tag: null, cat: 'Accessories' },
  { id: 'b-023', name: 'Silk Scrunchie 4', desc: 'Soft and snag-free silk', price: 399, img: silk4, tag: null, cat: 'Accessories' },
  { id: 'b-024', name: '2-Pack Silk Scrunchie', desc: 'Two silk scrunchies, one set', price: 499, img: pack2, tag: null, cat: 'Accessories' },
  { id: 'b-025', name: '3-Pack Silk Scrunchie', desc: 'Triple the silk, triple the style', price: 649, img: pack3, tag: null, cat: 'Accessories' },
  { id: 'b-026', name: '4-Pack Silk Scrunchie', desc: 'Full week of silk styling', price: 799, img: pack4, tag: null, cat: 'Accessories' },
];

const categories = ['All', ...Array.from(new Set(allProducts.map((p) => p.cat)))];

export default function AllBeauty() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? allProducts
    : allProducts.filter((p) => p.cat === activeFilter);

  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="pt-[100px] bg-white min-h-screen">

      {/* ── Breadcrumb ─────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          {' / '}
          <Link to="/beauty" className="hover:text-black transition-colors">Beauty</Link>
          {' / '}
          <span className="text-black">All Products</span>
        </p>
      </div>

      {/* ── Header ─────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 pb-5 border-b border-gray-100">
        <h1 className="text-2xl font-thin uppercase tracking-[0.2em] text-black mb-1">All Beauty</h1>
        <p className="text-xs text-gray-500 tracking-wide">{filtered.length} products</p>
      </div>

      {/* ── Category Filter Pills ──────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-5">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 border transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Product Grid ───────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Image */}
              <div className="relative bg-[#f7f4f1] overflow-hidden mb-3" style={{ aspectRatio: '3/4' }}>
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                />
                {product.tag && (
                  <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-widest bg-black text-white px-2 py-1">
                    {product.tag}
                  </span>
                )}
                <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest bg-gray-100 text-gray-600 px-2 py-1">
                  {product.cat}
                </span>
                {/* Quick Add */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-black text-white text-[10px] font-bold uppercase tracking-widest py-3 hover:bg-[#E50010] transition-colors duration-200"
                  >
                    + Quick Add
                  </button>
                </div>
              </div>
              <p className="text-xs font-semibold text-black uppercase tracking-wider leading-tight mb-0.5 line-clamp-2">
                {product.name}
              </p>
              <p className="text-[11px] text-gray-500 mb-1 line-clamp-1">{product.desc}</p>
              <p className="text-sm font-bold text-black">₹{product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Back ────────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 pb-12 text-center">
        <Link
          to="/beauty"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors border-b border-gray-300 hover:border-black pb-0.5"
        >
          ← Back to Beauty
        </Link>
      </div>
    </div>
  );
}
