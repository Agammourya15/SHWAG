import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';
import { assets } from '../assets/assets.js';
import HeroMedia from '../components/HeroMedia.jsx';

const Home = () => {
  const { products } = useContext(ShopContext);

  // Get a few products for display sections
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(-4);

  return (
    <div className='w-full'>
      {/* Hero Section */}
      <div className='w-full h-[100vh] relative overflow-hidden'>
        <video
          autoPlay
          loop
          muted
          playsInline
          className='absolute inset-0 w-full h-full object-cover z-0'
        >
          <source src='/assets/VIDEOS/WomenClothingAccessories.mp4' type='video/mp4' />
        </video>
        <div className='absolute inset-0 bg-black/20 z-10'></div>
        <div className='absolute inset-0 flex flex-col items-center justify-center z-20 text-white text-center mt-12'>
          <h1 className='text-4xl sm:text-6xl font-bold tracking-widest uppercase mb-4'>The New Standard</h1>
          <p className='text-sm sm:text-lg mb-8 tracking-widest'>Elevate your wardrobe.</p>
          <Link to='/women' className='border border-white text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300'>Shop Now</Link>
        </div>
      </div>

      {/* Featured Categories */}
      <div className='w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 h-[100vh]'>
          <div className='relative group overflow-hidden cursor-pointer' onClick={() => window.location.href = '/women'}>
            <img className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' src={assets.BalckDressCoverpage} alt="Women Collection" />
            <div className='absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500'></div>
            <div className='absolute bottom-16 left-12 text-white'>
              <h3 className='text-4xl font-bold mb-3 tracking-widest'>WOMEN</h3>
              <span className='uppercase tracking-widest text-sm border-b-2 py-1'>Shop Collection</span>
            </div>
          </div>
          <div className='relative group overflow-hidden cursor-pointer' onClick={() => window.location.href = '/men'}>
            <img className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' src={assets.bluecoverpage} alt="Men Collection" />
            <div className='absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500'></div>
            <div className='absolute bottom-16 left-12 text-white'>
              <h3 className='text-4xl font-bold mb-3 tracking-widest'>MEN</h3>
              <span className='uppercase tracking-widest text-sm border-b-2 py-1'>Shop Collection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Products */}
      <div className='bg-gray-100 py-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <div className='flex flex-col text-center mb-10'>
          <h2 className='text-3xl sm:text-4xl text-gray-900 font-bold mb-3'>TRENDING NOW</h2>
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500'>Most loved pieces this week.</p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6'>
          {featuredProducts.map((item, index) => (
            <Link to={`/product/${item._id}`} key={index} className='text-gray-700 cursor-pointer group'>
              <div className='overflow-hidden relative'>
                <img className='w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105' src={item.image[0]} alt={item.name} />
                {item.isSold && <span className='absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 uppercase tracking-wider'>Sold Out</span>}
              </div>
              <p className='pt-3 pb-1 text-sm font-medium tracking-wide truncate uppercase'>{item.name}</p>
              <p className='text-sm font-bold'>${item.price}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Sale Banner */}
      <div className='w-full h-[50vh] relative overflow-hidden mt-16'>
        <HeroMedia
          type="image"
          src={assets.goldencoverpage}
          title="MID-SEASON SALE"
          subtitle="Up to 50% off on selected items. Online and in-store."
          buttonText="View Sale"
        />
      </div>
    </div>
  )
}

export default Home;
