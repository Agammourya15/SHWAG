import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { Link } from 'react-router-dom';
import { Skeleton } from '../components/ui/skeleton.jsx';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

const Collection = ({ category }) => {
  const { products } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevant');

  const menCategories    = ['Winterwear', 'Jackets', 'Running', 'Shorts'];
  const womenCategories  = ['Dresses', 'Trousers', 'Topwear'];
  const activeCategories = category === 'Men' ? menCategories : womenCategories;

  const handleButtonFilter = (cat) => {
    setSelectedSubcategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
      let copy = [...products];
      if (category) copy = copy.filter(p => p.category === category);
      if (selectedSubcategories.length > 0) copy = copy.filter(p => selectedSubcategories.includes(p.subCategory));
      if (sortBy === 'low-high') copy.sort((a, b) => a.price - b.price);
      if (sortBy === 'high-low') copy.sort((a, b) => b.price - a.price);
      setFilterProducts(copy);
    }
  }, [products, category, selectedSubcategories, sortBy]);

  return (
    <div className='w-full bg-white'>

      {/* ── Category Header Video ───────────────────────────────────────── */}
      <div className='w-full relative overflow-hidden' style={{ height: '70vh' }}>
        <video
          autoPlay loop muted playsInline
          className='absolute inset-0 w-full h-full object-cover z-0'
        >
          {category === 'Men' ? (
            <source src="/assets/VIDEOS/Men's Clothing - Men's Fashion - Men's Clothes - H&M US.mp4" type='video/mp4' />
          ) : (
            <source src='/assets/VIDEOS/WomenClothingAccessories.mp4' type='video/mp4' />
          )}
        </video>
        <div className='absolute inset-0 bg-black/35 z-10' />
        <div className='absolute inset-0 flex flex-col items-start justify-end z-20 pb-12 px-8 sm:px-16'>
          <p className='text-white/70 text-xs font-semibold tracking-[0.25em] uppercase mb-2'>Spring / Summer 2026</p>
          <h1 className='text-white text-5xl sm:text-7xl font-bold tracking-widest uppercase'>
            {category === 'Men' ? 'MEN' : 'LADIES'}
          </h1>
          <p className='text-white/70 text-sm mt-2 tracking-widest font-light'>
            {category === 'Men'
              ? 'Style. Performance. Attitude.'
              : 'Effortless style for every occasion.'}
          </p>
        </div>
      </div>

      <div className='px-4 sm:px-8 lg:px-16 pt-6'>

        {/* ── Filter & Sort Bar ────────────────────────────────────────── */}
        <div className='flex items-center justify-between py-4 border-b border-gray-200 mb-6 flex-wrap gap-3'>
          <div className='flex items-center gap-2 flex-wrap'>
            <span className='flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-500 mr-2'>
              <SlidersHorizontal className='w-3.5 h-3.5' />
              Filter:
            </span>

            {/* All button */}
            <button
              onClick={() => setSelectedSubcategories([])}
              className={`text-xs font-bold uppercase tracking-widest px-3 py-2 border transition-colors ${
                selectedSubcategories.length === 0
                  ? 'bg-black text-white border-black'
                  : 'border-gray-300 text-gray-700 hover:border-black'
              }`}
            >
              All
            </button>

            {/* Category pills */}
            {activeCategories.map(cat => (
              <button
                key={cat}
                onClick={() => handleButtonFilter(cat)}
                className={`text-xs font-bold uppercase tracking-widest px-3 py-2 border transition-colors ${
                  selectedSubcategories.includes(cat)
                    ? 'bg-black text-white border-black'
                    : 'border-gray-300 text-gray-700 hover:border-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className='flex items-center gap-3'>
            <span className='text-xs text-gray-500 uppercase tracking-widest hidden sm:block'>
              {filterProducts.length} items
            </span>
            <div className='relative'>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='appearance-none border border-gray-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 pr-8 bg-white text-black cursor-pointer focus:outline-none focus:border-black'
              >
                <option value='relevant'>Sort: Relevant</option>
                <option value='low-high'>Price: Low – High</option>
                <option value='high-low'>Price: High – Low</option>
              </select>
              <ChevronDown className='absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none' />
            </div>
          </div>
        </div>

        {/* ── Product Grid ─────────────────────────────────────────────── */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10 pb-20'>
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className='space-y-3'>
                <Skeleton className='aspect-[3/4] w-full' />
                <Skeleton className='h-3 w-3/4' />
                <Skeleton className='h-3 w-1/4' />
              </div>
            ))
          ) : filterProducts.length === 0 ? (
            <div className='col-span-full py-24 flex flex-col items-center text-center'>
              <p className='text-xl font-light tracking-widest text-gray-400 mb-4'>No products found</p>
              <button
                onClick={() => setSelectedSubcategories([])}
                className='text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 hover:text-[#E50010] hover:border-[#E50010] transition-colors'
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filterProducts.map((item) => (
              <Link to={`/product/${item._id}`} key={item._id} className='product-card block text-gray-900'>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
