import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';
import { toast } from 'react-toastify';

const Product = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    if (products && products.length > 0) {
      const getProduct = products.find((item) => item._id === id);
      if (getProduct) {
        setProductData(getProduct);
        setImage(getProduct.image[0]);
      }
    }
  }, [id, products]);

  if (!productData) {
    return <div className="h-screen flex items-center justify-center font-light tracking-wide text-gray-500">Loading product details...</div>;
  }

  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pb-20'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row mt-10'>
        {/* Image Grid */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full scrollbar-none'>
            {productData.image.map((item, index) => (
              <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer object-cover aspect-[3/4] opacity-70 hover:opacity-100 transition-opacity' alt="" />
            ))}
          </div>
          <div className='w-full sm:w-[80%] relative bg-gray-100 flex items-center justify-center'>
            <img className='w-full h-auto object-cover aspect-[3/4]' src={image} alt="Main Product View" />
            {productData.isSold && <span className='absolute top-5 left-5 bg-red-500/90 text-white text-[10px] px-3 py-1 uppercase tracking-widest font-bold'>Sold Out</span>}
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1 flex flex-col'>
          <h1 className='font-bold text-3xl sm:text-4xl tracking-widest uppercase mt-4 text-gray-900'>{productData.name}</h1>
          <p className='mt-4 text-2xl font-medium tracking-wider text-gray-900'>${productData.price.toFixed(2)}</p>

          <p className='mt-8 text-gray-600 font-light leading-relaxed max-w-xl text-justify text-base'>
            {productData.description}
          </p>

          <div className='flex flex-col gap-5 my-10'>
            <p className='text-xs font-bold uppercase tracking-widest text-gray-800'>Select Size</p>
            <div className='flex gap-4'>
              {sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border text-sm font-medium w-14 py-3 tracking-widest transition-all ${item === size ? 'border-black bg-black text-white shadow-xl scale-105' : 'border-gray-300 bg-white hover:border-black text-gray-700'}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              if (!size) {
                toast.error('Please select a size first');
                return;
              }
              addToCart(productData._id, size);
              toast.dark('Added to cart');
            }}
            disabled={productData.isSold}
            className='bg-black text-white px-8 py-5 text-sm font-bold uppercase tracking-widest active:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed w-full max-w-md transition-all active:scale-95 shadow-lg'
          >
            {productData.isSold ? 'Out of Stock' : 'Add to Cart — $' + productData.price.toFixed(2)}
          </button>

          <hr className='mt-12 sm:w-4/5 border-gray-200' />

          <div className='text-xs text-gray-500 mt-6 flex flex-col gap-3 font-light tracking-widest uppercase'>
            <p className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> 100% Original product.</p>
            <p className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Free delivery on orders above $200.</p>
            <p className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Easy 14-day return and exchange policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
