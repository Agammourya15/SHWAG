import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';
import { toast } from 'react-toastify';

import satinLipstick from '../assets/beauty Products/Satin Icon lipstick.avif';
import madMatte from '../assets/beauty Products/Mad For Matte liquid lipstick.avif';
import doItAll from '../assets/beauty Products/Do-It-All-Stick Highlighter.avif';
import makeItEasy from '../assets/beauty Products/Make It Easy eyeshadow pen.avif';
import dipLiner from '../assets/beauty Products/Dipliner Ink liquid eyeliner.avif';
import glowPro from '../assets/beauty Products/Glow Pro highlighter.avif';
import buffingBrush from '../assets/beauty Products/Buffing foundation brush.avif';
import nailPolish from '../assets/beauty Products/Nail polish.avif';
import nailKit from '../assets/beauty Products/Nail travel kit.avif';
import lipsEssentials from '../assets/beauty Products/Lips Essentials.avif';
import pack2 from '../assets/beauty Products/2-pack Silk scrunchie.avif';
import pack3 from '../assets/beauty Products/3-pack Silk scrunchie.avif';

const lipProducts = [
  {
    id: 'lip-001',
    name: 'Satin Icon Lipstick',
    desc: 'Rich, long-lasting colour with a satin gloss finish',
    price: 599,
    img: satinLipstick,
    tag: 'Bestseller',
  },
  {
    id: 'lip-002',
    name: 'Mad For Matte Liquid Lipstick',
    desc: 'Intense matte colour that lasts all day',
    price: 649,
    img: madMatte,
    tag: 'New',
  },
  {
    id: 'lip-003',
    name: 'Do-It-All Stick Highlighter',
    desc: 'Multi-use highlighter stick for eyes, cheeks, and lips',
    price: 649,
    img: doItAll,
    tag: null,
  },
  {
    id: 'lip-004',
    name: 'Make It Easy Eyeshadow Pen',
    desc: 'Precision eyeshadow pen for effortless liner and shadow looks',
    price: 599,
    img: makeItEasy,
    tag: null,
  },
  {
    id: 'lip-005',
    name: 'Dipliner Ink Liquid Eyeliner',
    desc: 'Ultra-fine tip for precise, smudge-free lines',
    price: 549,
    img: dipLiner,
    tag: 'Trending',
  },
  {
    id: 'lip-006',
    name: 'Glow Pro Highlighter',
    desc: 'Buildable luminous glow for a radiant finish',
    price: 699,
    img: glowPro,
    tag: null,
  },
  {
    id: 'lip-007',
    name: 'Buffing Foundation Brush',
    desc: 'Flawless, airbrushed foundation application',
    price: 799,
    img: buffingBrush,
    tag: null,
  },
  {
    id: 'lip-008',
    name: 'Nail Polish',
    desc: 'High-shine, chip-resistant formula in seasonal shades',
    price: 299,
    img: nailPolish,
    tag: null,
  },
  {
    id: 'lip-009',
    name: 'Nail Travel Kit',
    desc: 'Complete manicure set in a compact travel pouch',
    price: 799,
    img: nailKit,
    tag: null,
  },
  {
    id: 'lip-010',
    name: 'Lip Essentials Gift Set',
    desc: 'Curated lip essentials set — perfect as a gift',
    price: 1499,
    img: lipsEssentials,
    tag: 'Gift Set',
  },
  {
    id: 'lip-011',
    name: '2-Pack Silk Scrunchie',
    desc: 'Gentle silk scrunchies that protect your hair while styling',
    price: 499,
    img: pack2,
    tag: null,
  },
  {
    id: 'lip-012',
    name: '3-Pack Silk Scrunchie',
    desc: 'Set of 3 silk scrunchies in complementary shades',
    price: 649,
    img: pack3,
    tag: null,
  },
];

export default function LipEssentials() {
  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="pt-[100px] bg-white min-h-screen">

      {/* ── Breadcrumb ──────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          {' / '}
          <Link to="/beauty" className="hover:text-black transition-colors">Beauty</Link>
          {' / '}
          <span className="text-black">Lip Essentials</span>
        </p>
      </div>

      {/* ── Header ──────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 pb-6 border-b border-gray-100">
        <h1 className="text-2xl font-thin uppercase tracking-[0.2em] text-black mb-1">Lip Essentials</h1>
        <p className="text-xs text-gray-500 tracking-wide">{lipProducts.length} products</p>
      </div>

      {/* ── Product Grid ────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {lipProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Image */}
              <div className="relative bg-[#f7f4f1] overflow-hidden mb-3" style={{ aspectRatio: '3/4' }}>
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 p-4"
                />
                {/* Tag badge */}
                {product.tag && (
                  <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-widest bg-black text-white px-2 py-1">
                    {product.tag}
                  </span>
                )}
                {/* Hover overlay — Quick Add */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-black text-white text-[10px] font-bold uppercase tracking-widest py-3 hover:bg-[#E50010] transition-colors duration-200"
                  >
                    + Quick Add
                  </button>
                </div>
              </div>

              {/* Info */}
              <p className="text-xs font-semibold text-black uppercase tracking-wider leading-tight mb-0.5 line-clamp-2">
                {product.name}
              </p>
              <p className="text-[11px] text-gray-500 mb-1 line-clamp-1">{product.desc}</p>
              <p className="text-sm font-bold text-black">₹{product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Back to Beauty ──────────────────────────────── */}
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
