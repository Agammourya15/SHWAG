import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import mysticVelvet from '../assets/beauty Products/MYSTIC VELVET.avif';
import pearlDream from '../assets/beauty Products/PERAL DREAM EDP.avif';
import rubyTouch from '../assets/beauty Products/RUBY TOUCH EDP.avif';
import whiteAir from '../assets/beauty Products/WHITE AIR.avif';
import whiteAir2 from '../assets/beauty Products/White Air EDP2.avif';

const fragrances = [
  {
    id: 'frag-001',
    name: 'Mystic Velvet EDP',
    desc: 'A deep, smoky velvet fragrance with notes of black plum, sandalwood, and amber. For the bold and mysterious.',
    price: 2999,
    img: mysticVelvet,
    tag: 'Bestseller',
    size: '50ml',
    notes: 'Black Plum · Sandalwood · Amber',
  },
  {
    id: 'frag-002',
    name: 'Pearl Dream EDP',
    desc: 'An ethereal floral musk with peony, soft musk, and white cedar. Delicate and dreamlike.',
    price: 3499,
    img: pearlDream,
    tag: 'New',
    size: '30ml',
    notes: 'Peony · White Cedar · Soft Musk',
  },
  {
    id: 'frag-003',
    name: 'Ruby Touch EDP',
    desc: 'A warm and spicy oriental with bergamot, rose, and oud. A statement fragrance for every occasion.',
    price: 2799,
    img: rubyTouch,
    tag: 'Trending',
    size: '50ml',
    notes: 'Bergamot · Rose · Oud',
  },
  {
    id: 'frag-004',
    name: 'White Air EDP',
    desc: 'A fresh, airy blend of white tea, lotus flower, and cedarwood. Clean and effortlessly light.',
    price: 2499,
    img: whiteAir,
    tag: null,
    size: '50ml',
    notes: 'White Tea · Lotus · Cedarwood',
  },
  {
    id: 'frag-005',
    name: 'White Air Intense EDP',
    desc: 'An intensified version of White Air — deeper, more luminous, and longer-lasting.',
    price: 2799,
    img: whiteAir2,
    tag: 'Limited',
    size: '30ml',
    notes: 'White Tea · Jasmine · Musk',
  },
];

export default function Fragrance() {
  const [hovered, setHovered] = useState(null);

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
          <span className="text-black">Fragrance</span>
        </p>
      </div>

      {/* ── Header ─────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 pb-6 border-b border-gray-100">
        <h1 className="text-2xl font-thin uppercase tracking-[0.2em] text-black mb-1">Fragrance</h1>
        <p className="text-xs text-gray-500 tracking-wide">{fragrances.length} products</p>
      </div>

      {/* ── Hero Banner ─────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden mb-10"
        style={{ height: '300px', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
      >
        {/* Decorative perfume bottles row */}
        <div className="absolute inset-0 flex items-center justify-center gap-10 opacity-30 pointer-events-none">
          {fragrances.map((f) => (
            <img key={f.id} src={f.img} alt={f.name} className="h-56 object-contain" />
          ))}
        </div>
        {/* Text overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] mb-3 opacity-60">Collection</p>
          <h2 className="text-4xl md:text-5xl font-thin uppercase tracking-[0.2em] mb-2">Signature Scents</h2>
          <p className="text-sm opacity-70 tracking-wider font-light">Discover fragrances that define you</p>
        </div>
      </div>

      {/* ── Product Grid ───────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {fragrances.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image card */}
              <div
                className="relative overflow-hidden mb-3"
                style={{
                  aspectRatio: '3/4',
                  background: 'linear-gradient(160deg, #1a1a2e 0%, #2c2c54 100%)',
                }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                />
                {/* Tag */}
                {product.tag && (
                  <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-widest bg-white text-black px-2 py-1">
                    {product.tag}
                  </span>
                )}
                {/* Size pill */}
                <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest bg-white/20 text-white px-2 py-1 backdrop-blur-sm">
                  {product.size}
                </span>
                {/* Quick Add */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-white text-black text-[10px] font-bold uppercase tracking-widest py-3 hover:bg-[#E50010] hover:text-white transition-colors duration-200"
                  >
                    + Quick Add
                  </button>
                </div>
              </div>

              {/* Info */}
              <p className="text-xs font-semibold text-black uppercase tracking-wider leading-tight mb-0.5 line-clamp-1">
                {product.name}
              </p>
              <p className="text-[10px] text-gray-400 mb-1 italic">{product.notes}</p>
              <p className="text-sm font-bold text-black">₹{product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Back to Beauty ─────────────────────────────── */}
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
