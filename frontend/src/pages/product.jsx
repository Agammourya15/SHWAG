import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';
import { toast } from 'react-toastify';
import { ChevronDown, ChevronUp, Truck, RotateCcw, Shield } from 'lucide-react';

const Product = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [descOpen, setDescOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);

  useEffect(() => {
    if (products && products.length > 0) {
      const found = products.find(p => p._id === id);
      if (found) { setProductData(found); setImage(found.image[0]); }
    }
  }, [id, products]);

  if (!productData) {
    return (
      <div className='h-screen flex items-center justify-center bg-white'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-8 h-8 border-2 border-black border-t-transparent animate-spin' />
          <p className='text-xs uppercase tracking-widest text-gray-500'>Loading product…</p>
        </div>
      </div>
    );
  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className='bg-white min-h-screen pt-[88px]'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-8 pb-20'>

        {/* Breadcrumb */}
        <nav className='flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-widest mb-6 font-semibold'>
          <a href='/' className='hover:text-black transition-colors'>Home</a>
          <span>/</span>
          <a href={productData.category === 'Men' ? '/men' : '/women'} className='hover:text-black transition-colors'>
            {productData.category}
          </a>
          <span>/</span>
          <span className='text-black truncate max-w-[200px]'>{productData.name}</span>
        </nav>

        <div className='flex flex-col lg:flex-row gap-8 lg:gap-14'>

          {/* ── Image Gallery ───────────────────────────────────────────── */}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            {/* Thumbnails */}
            <div className='flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:w-20 flex-shrink-0'>
              {productData.image.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImage(img)}
                  className={`flex-shrink-0 border-2 transition-all overflow-hidden ${
                    image === img ? 'border-black' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt='' className='w-16 sm:w-full h-16 sm:h-24 object-cover' />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className='flex-1 relative bg-gray-50 overflow-hidden'>
              <img
                className='w-full h-full object-cover aspect-[3/4]'
                src={image} alt={productData.name}
              />
              {productData.isSold && (
                <span className='absolute top-0 left-0 bg-[#E50010] text-white text-xs px-3 py-1.5 font-bold uppercase tracking-widest'>
                  Sold Out
                </span>
              )}
            </div>
          </div>

          {/* ── Product Info ─────────────────────────────────────────────── */}
          <div className='flex-1 lg:max-w-md xl:max-w-lg'>
            <p className='text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-2'>{productData.category}</p>
            <h1 className='text-2xl sm:text-3xl font-bold tracking-wide uppercase text-black mb-3 leading-tight'>
              {productData.name}
            </h1>
            <p className='text-2xl font-bold text-black mb-6'>₹{productData.price.toFixed(2)}</p>

            <hr className='border-gray-200 mb-6' />

            {/* Size Selector */}
            <div className='mb-6'>
              <div className='flex items-center justify-between mb-3'>
                <p className='text-xs font-bold uppercase tracking-widest text-black'>Select Size</p>
                <button className='text-xs underline text-gray-500 hover:text-black tracking-wide'>Size Guide</button>
              </div>
              <div className='flex flex-wrap gap-2'>
                {sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-14 py-3 text-xs font-bold uppercase tracking-widest border-2 transition-all ${
                      s === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 text-gray-700 hover:border-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => {
                if (!size) { toast.error('Please select a size'); return; }
                addToCart(productData._id, size);
                toast.success('Added to shopping bag');
              }}
              disabled={productData.isSold}
              className={`w-full py-4 text-sm font-bold uppercase tracking-widest mb-3 transition-all ${
                productData.isSold
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-[#E50010] active:scale-[0.99]'
              }`}
            >
              {productData.isSold ? 'Out of Stock' : 'Add to Shopping Bag'}
            </button>
            <button className='w-full py-4 text-sm font-bold uppercase tracking-widest border-2 border-black text-black hover:bg-gray-50 transition-colors mb-6'>
              Save to Wishlist
            </button>

            {/* Delivery info strip */}
            <div className='flex flex-col gap-3 py-4 border-t border-b border-gray-200 mb-6'>
              <div className='flex items-center gap-3 text-xs text-gray-600 tracking-wide'>
                <Truck className='w-4 h-4 flex-shrink-0 text-black' />
                <span>Free delivery on orders above <strong className='text-black'>₹499</strong></span>
              </div>
              <div className='flex items-center gap-3 text-xs text-gray-600 tracking-wide'>
                <RotateCcw className='w-4 h-4 flex-shrink-0 text-black' />
                <span>Easy 14-day returns & exchanges</span>
              </div>
              <div className='flex items-center gap-3 text-xs text-gray-600 tracking-wide'>
                <Shield className='w-4 h-4 flex-shrink-0 text-black' />
                <span>100% authentic product guarantee</span>
              </div>
            </div>

            {/* Description Accordion */}
            <div className='border-b border-gray-200'>
              <button
                className='flex items-center justify-between w-full py-4 text-xs font-bold uppercase tracking-widest text-black'
                onClick={() => setDescOpen(!descOpen)}
              >
                Product Description
                {descOpen ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
              </button>
              {descOpen && (
                <div className='pb-4'>
                  <p className='text-sm text-gray-600 font-light leading-relaxed'>
                    {productData.description}
                  </p>
                </div>
              )}
            </div>

            {/* Shipping Accordion */}
            <div className='border-b border-gray-200'>
              <button
                className='flex items-center justify-between w-full py-4 text-xs font-bold uppercase tracking-widest text-black'
                onClick={() => setShippingOpen(!shippingOpen)}
              >
                Delivery & Returns
                {shippingOpen ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
              </button>
              {shippingOpen && (
                <div className='pb-4'>
                  <p className='text-sm text-gray-600 font-light leading-relaxed'>
                    Standard delivery 3–5 business days. Express delivery available at checkout. Free returns within 14 days.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
