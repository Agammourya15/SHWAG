import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';
import { assets } from '../assets/assets.js';
import { Skeleton } from '../components/ui/skeleton.jsx';

const Home = () => {
  const { products } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) setLoading(false);
  }, [products]);

  // Curated product sections
  const womenDresses   = products.filter(p => p.category === 'Women' && p.subCategory === 'Dresses').slice(0, 4);
  const womenTopwear   = products.filter(p => p.category === 'Women' && p.subCategory === 'Topwear').slice(0, 4);
  const menProducts    = products.filter(p => p.category === 'Men').slice(0, 4);
  const winterProducts = products.filter(p => p.image?.[0]?.includes('/winter/')).slice(0, 4);

  const ProductCard = ({ item }) => (
    <Link to={`/product/${item._id}`} className='product-card block text-gray-900'>
      <div className='overflow-hidden relative bg-gray-50'>
        <img
          className='w-full aspect-[3/4] object-cover product-img'
          src={item.image[0]}
          alt={item.name}
        />
        {item.isSold && (
          <span className='absolute top-0 left-0 bg-[#E50010] text-white text-[10px] px-2 py-1 font-bold uppercase tracking-wider'>
            Sold Out
          </span>
        )}
      </div>
      <div className='mt-3 px-0.5'>
        <p className='text-xs font-semibold tracking-widest uppercase text-gray-800 truncate'>{item.name}</p>
        <p className='text-sm font-bold mt-1 text-black'>₹{item.price.toLocaleString()}</p>
      </div>
    </Link>
  );

  const SkeletonCards = ({ count = 4 }) => (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className='space-y-3'>
          <Skeleton className='aspect-[3/4] w-full' />
          <Skeleton className='h-3 w-3/4' />
          <Skeleton className='h-3 w-1/4' />
        </div>
      ))}
    </>
  );

  return (
    <div className='w-full bg-white'>

      {/* ── 1. Hero Video — Women's Collection ───────────────────────────── */}
      <div className='w-full h-screen relative overflow-hidden'>
        <video
          autoPlay loop muted playsInline
          className='absolute inset-0 w-full h-full object-cover z-0'
        >
          <source src='/assets/VIDEOS/WomenClothingAccessories.mp4' type='video/mp4' />
          {/* fallback poster */}
          <img src={assets.BalckDressCoverpage} className='w-full h-full object-cover' alt='hero' />
        </video>
        <div className='absolute inset-0 bg-black/30 z-10' />
        <div className='absolute inset-0 flex flex-col items-start justify-end z-20 pb-20 px-8 sm:px-16 lg:px-24'>
          <p className='text-white/80 text-sm sm:text-base mb-8 tracking-widest font-light'>
            Elevate your wardrobe. Style that speaks.
          </p>
          <div className='flex gap-4 flex-wrap'>
            <Link to='/women' className='hm-btn-white'>Shop Ladies</Link>
            <Link to='/men' className='hm-btn-red'>Shop Men</Link>
          </div>
        </div>
      </div>

      {/* ── 2. Category Split Tiles ───────────────────────────────────────── */}
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <Link to='/women' className='relative group overflow-hidden block' style={{ height: '70vh' }}>
          <img
            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
            src={assets.BalckDressCoverpage}
            alt='Ladies Collection'
          />
          <div className='absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500' />
          <div className='absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent'>
            <p className='text-white/70 text-xs font-semibold tracking-[0.25em] uppercase mb-2'>Explore</p>
            <h3 className='text-white text-4xl font-bold tracking-widest uppercase mb-3'>LADIES</h3>
            <span className='inline-block text-white text-xs font-bold tracking-widest uppercase border-b border-white pb-1'>
              Shop Now
            </span>
          </div>
        </Link>
        <Link to='/men' className='relative group overflow-hidden block' style={{ height: '70vh' }}>
          <img
            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
            src={assets.bluecoverpage}
            alt='Men Collection'
          />
          <div className='absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500' />
          <div className='absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent'>
            <p className='text-white/70 text-xs font-semibold tracking-[0.25em] uppercase mb-2'>Explore</p>
            <h3 className='text-white text-4xl font-bold tracking-widest uppercase mb-3'>MEN</h3>
            <span className='inline-block text-white text-xs font-bold tracking-widest uppercase border-b border-white pb-1'>
              Shop Now
            </span>
          </div>
        </Link>
      </div>

      {/* ── 3. Women's Dresses Section ────────────────────────────────────── */}
      <div className='py-14 px-4 sm:px-8 lg:px-16 bg-white'>
        <div className='flex items-end justify-between mb-8 border-b border-gray-200 pb-4'>
          <div>
            <p className='text-xs font-bold tracking-[0.25em] uppercase text-[#E50010] mb-1'>New In</p>
            <h2 className='text-3xl font-bold uppercase tracking-wide text-black'>Dresses</h2>
          </div>
          <Link to='/women' className='text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 hover:text-[#E50010] hover:border-[#E50010] transition-colors'>
            View All
          </Link>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-8'>
          {loading ? <SkeletonCards count={4} /> : womenDresses.map(item => <ProductCard key={item._id} item={item} />)}
        </div>
      </div>

      {/* ── 4. Women's Image Banner ───────────────────────────────────────── */}
      <div className='relative overflow-hidden' style={{ height: '70vh' }}>
        <img
          src={assets.BalckDressCoverpage}
          alt="Women's Essentials"
          className='absolute inset-0 w-full h-full object-cover z-0'
        />
        <div className='absolute inset-0 bg-black/35 z-10' />
        <div className='absolute inset-0 flex flex-col items-start justify-end z-20 p-8 sm:p-16'>
          <p className='text-white/70 text-xs font-bold tracking-[0.3em] uppercase mb-2'>Spring / Summer 2026</p>
          <h2 className='text-white text-5xl sm:text-6xl font-bold uppercase tracking-tight mb-4'>Women's<br />Essentials</h2>
          <p className='text-white/80 text-sm font-light tracking-widest mb-8 max-w-md'>
            From everyday basics to statement pieces — discover the season's must-haves.
          </p>
          <Link to='/women' className='hm-btn-white'>Shop Women</Link>
        </div>
      </div>

      {/* ── 5. Women's Topwear ────────────────────────────────────────────── */}
      <div className='py-14 px-4 sm:px-8 lg:px-16 bg-gray-50'>
        <div className='flex items-end justify-between mb-8 border-b border-gray-200 pb-4'>
          <div>
            <p className='text-xs font-bold tracking-[0.25em] uppercase text-[#E50010] mb-1'>Curated for You</p>
            <h2 className='text-3xl font-bold uppercase tracking-wide text-black'>Tops & Shirts</h2>
          </div>
          <Link to='/women' className='text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 hover:text-[#E50010] hover:border-[#E50010] transition-colors'>
            View All
          </Link>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-8'>
          {loading ? <SkeletonCards count={4} /> : womenTopwear.map(item => <ProductCard key={item._id} item={item} />)}
        </div>
      </div>

      {/* ── 6. Men's Video Banner ─────────────────────────────────────────── */}
      <div className='relative overflow-hidden' style={{ height: '70vh' }}>
        <video
          autoPlay loop muted playsInline
          className='absolute inset-0 w-full h-full object-cover z-0'
        >
          <source src="/assets/VIDEOS/Men's Clothing - Men's Fashion - Men's Clothes - H&M US.mp4" type='video/mp4' />
        </video>
        <div className='absolute inset-0 bg-black/35 z-10' />
        <div className='absolute inset-0 flex flex-col items-end justify-end z-20 p-8 sm:p-16 text-right'>
          <p className='text-white/70 text-xs font-bold tracking-[0.3em] uppercase mb-2'>For Him</p>
          <h2 className='text-white text-5xl sm:text-6xl font-bold uppercase tracking-tight mb-4'>Men's<br />Collection</h2>
          <p className='text-white/80 text-sm font-light tracking-widest mb-8 max-w-md'>
            Performance meets style — explore our latest men's range.
          </p>
          <Link to='/men' className='hm-btn-red'>Shop Men</Link>
        </div>
      </div>

      {/* ── 7. Men's Products ─────────────────────────────────────────────── */}
      <div className='py-14 px-4 sm:px-8 lg:px-16 bg-white'>
        <div className='flex items-end justify-between mb-8 border-b border-gray-200 pb-4'>
          <div>
            <p className='text-xs font-bold tracking-[0.25em] uppercase text-[#E50010] mb-1'>For Him</p>
            <h2 className='text-3xl font-bold uppercase tracking-wide text-black'>Men's Picks</h2>
          </div>
          <Link to='/men' className='text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 hover:text-[#E50010] hover:border-[#E50010] transition-colors'>
            View All
          </Link>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-8'>
          {loading ? <SkeletonCards count={4} /> : menProducts.map(item => <ProductCard key={item._id} item={item} />)}
        </div>
      </div>

      {/* ── 8. Sale Banner ─────────────────────────────────────────────────── */}
      <div className='relative overflow-hidden' style={{ height: '50vh' }}>
        <img src={assets.goldencoverpage} alt='Sale Banner' className='w-full h-full object-cover' />
        <div className='absolute inset-0 bg-black/45' />
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4'>
          <p className='text-xs font-bold tracking-[0.3em] uppercase text-[#E50010] mb-3'>Limited Time</p>
          <h2 className='text-white text-5xl sm:text-6xl font-bold uppercase tracking-tight mb-3'>MID-SEASON SALE</h2>
          <p className='text-white/80 text-sm sm:text-base mb-8 tracking-widest font-light'>Up to 50% off on selected items. Online & in-store.</p>
          <Link to='/women' className='hm-btn-red'>View Sale Items</Link>
        </div>
      </div>

      {/* ── 9. Winter Edit ────────────────────────────────────────────────── */}
      {!loading && winterProducts.length > 0 && (
        <div className='py-14 px-4 sm:px-8 lg:px-16 bg-gray-50'>
          <div className='flex items-end justify-between mb-8 border-b border-gray-200 pb-4'>
            <div>
              <p className='text-xs font-bold tracking-[0.25em] uppercase text-[#E50010] mb-1'>Selected Picks</p>
              <h2 className='text-3xl font-bold uppercase tracking-wide text-black'>Winter Edit</h2>
            </div>
            <Link to='/women' className='text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 hover:text-[#E50010] hover:border-[#E50010] transition-colors'>
              Shop Winter
            </Link>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-8'>
            {winterProducts.map(item => <ProductCard key={item._id} item={item} />)}
          </div>
        </div>
      )}

      {/* ── 10. Beauty / Accessories Video Strip ─────────────────────────── */}
      <div className='relative overflow-hidden' style={{ height: '50vh' }}>
        <video
          autoPlay loop muted playsInline
          className='absolute inset-0 w-full h-full object-cover z-0'
        >
          <source src='/assets/VIDEOS/Beauty - H&M US.mp4' type='video/mp4' />
        </video>
        <div className='absolute inset-0 bg-black/40 z-10' />
        <div className='absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4'>
          <p className='text-white/70 text-xs font-bold tracking-[0.3em] uppercase mb-3'>Complete Your Look</p>
          <h2 className='text-white text-4xl sm:text-5xl font-bold uppercase tracking-tight mb-6'>Accessories & Beauty</h2>
          <Link to='/women' className='hm-btn-white'>Explore Accessories</Link>
        </div>
      </div>

      {/* ── 11. Feature Strips ────────────────────────────────────────────── */}
      <div className='border-t border-gray-200 bg-white py-10 px-4'>
        <div className='max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center'>
          {[
            { icon: '🚚', title: 'Free Delivery', sub: 'On orders above ₹499' },
            { icon: '↩️', title: '14-Day Returns', sub: 'Easy & hassle-free' },
            { icon: '🔒', title: 'Secure Payment', sub: '100% protected transactions' },
          ].map(f => (
            <div key={f.title} className='flex flex-col items-center gap-2'>
              <span className='text-3xl'>{f.icon}</span>
              <p className='text-xs font-bold uppercase tracking-widest text-black'>{f.title}</p>
              <p className='text-xs text-gray-500 tracking-wide'>{f.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
