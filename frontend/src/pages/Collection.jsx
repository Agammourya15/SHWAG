import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { Link } from 'react-router-dom';

const Collection = ({ category }) => {
  const { products } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (selectedSubcategories.includes(value)) {
      setSelectedSubcategories(prev => prev.filter(item => item !== value));
    } else {
      setSelectedSubcategories(prev => [...prev, value]);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      if (category) {
        productsCopy = productsCopy.filter(item => item.category === category);
      }
      if (selectedSubcategories.length > 0) {
        productsCopy = productsCopy.filter(item => selectedSubcategories.includes(item.subCategory));
      }
      setFilterProducts(productsCopy);
    }
  }, [products, category, selectedSubcategories]);

  const menCategories = ['Winterwear', 'Jackets', 'Running', 'Shorts'];
  const womenCategories = ['Dresses', 'Trousers', 'Topwear'];
  const activeCategories = category === 'Men' ? menCategories : womenCategories;

  return (
    <div className='w-full'>
      {/* Dynamic Header Video for Men */}
      {category === 'Men' && (
        <div className='w-full h-screen relative overflow-hidden'>
          <video autoPlay loop muted playsInline className='absolute inset-0 w-full h-full object-cover z-0'>
            <source src="/assets/VIDEOS/Men's Clothing - Men's Fashion - Men's Clothes - H&M US.mp4" type="video/mp4" />
          </video>
          <div className='absolute inset-0 bg-black/20 z-10'></div>
          <div className='absolute inset-0 flex flex-col items-center justify-center z-20 text-white text-center mt-12'>
            <h1 className='text-4xl sm:text-6xl font-bold tracking-widest uppercase mb-4'>MEN'S COLLECTION</h1>
          </div>
        </div>
      )}

      <div className={`flex flex-col sm:flex-row gap-4 sm:gap-10 ${category === 'Men' ? 'pt-16' : 'pt-28'} px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]`}>
        {/* Filter Section */}
        <div className='min-w-60 hidden sm:block'>
          <p className='my-2 text-xl flex items-center cursor-pointer gap-2 font-medium tracking-wide text-gray-900'>
            FILTERS
          </p>
          <div className='border-t border-gray-300 py-3 mt-4'>
            <p className='mb-3 text-sm font-bold uppercase tracking-widest text-gray-900'>Categories</p>
            <div className='flex flex-col gap-3 text-sm font-light text-gray-700'>
              {activeCategories.map((cat, index) => (
                <p className='flex gap-2 items-center' key={index}>
                  <input
                    className='w-4 h-4 cursor-pointer accent-black'
                    type="checkbox"
                    value={cat}
                    onChange={toggleSubCategory}
                    checked={selectedSubcategories.includes(cat)}
                  />
                  {cat}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className='flex-1 pb-20'>
          <div className='flex justify-between items-center text-base sm:text-2xl mb-8 border-b border-gray-200 pb-4'>
            <h2 className="text-2xl pt-2 uppercase tracking-widest font-bold">{category} <span className="text-gray-400 font-light">COLLECTION</span></h2>

            <select className='border border-gray-300 text-sm px-4 py-2 bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-black'>
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Grid */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10'>
            {filterProducts.length === 0 ? (
              <p className="col-span-full py-20 text-center text-gray-400 font-light tracking-wide">Loading products... or no products found.</p>
            ) : (
              filterProducts.map((item, index) => (
                <Link to={`/product/${item._id}`} key={index} className='text-gray-900 cursor-pointer group flex flex-col'>
                  <div className='overflow-hidden relative flex-1'>
                    <img className='w-full h-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105' src={item.image[0]} alt={item.name} />
                    {item.isSold && <span className='absolute top-3 left-3 bg-red-500/90 text-white text-[10px] px-3 py-1 uppercase tracking-widest font-bold'>Sold Out</span>}
                  </div>
                  <div className='mt-4 flex flex-col gap-1'>
                    <p className='text-sm font-medium tracking-wide truncate uppercase text-gray-800'>{item.name}</p>
                    <p className='text-sm font-bold tracking-widest'>${item.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
