import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { products, cartItems, updateQuantity, getCartAmount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className='border-t pt-14 pb-24 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <div className='text-2xl mb-8 flex justify-between items-end border-b pb-4'>
        <h2 className="text-3xl uppercase tracking-widest font-bold">Your <span className="text-gray-400 font-light">Cart</span></h2>
        <span className='font-light text-sm tracking-widest text-gray-500 uppercase'>{cartData.length} Items</span>
      </div>

      <div>
        {cartData.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-center text-gray-500'>
            <svg className="w-16 h-16 mb-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <p className='text-xl tracking-widest font-light'>Your cart is currently empty.</p>
            <Link to="/" className='mt-8 bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors'>Return to Shop</Link>
          </div>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;

            return (
              <div key={index} className='py-6 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 group'>
                <div className='flex items-start gap-6'>
                  <Link to={`/product/${productData._id}`}>
                    <img className='w-20 sm:w-24 aspect-[3/4] object-cover transition-transform group-hover:scale-105' src={productData.image[0]} alt="" />
                  </Link>
                  <div>
                    <p className='text-sm sm:text-lg font-bold tracking-widest uppercase mb-1'>{productData.name}</p>
                    <div className='flex items-center gap-4 text-xs tracking-widest uppercase text-gray-500 mt-2 font-light'>
                      <p>${productData.price.toFixed(2)}</p>
                      <p className='px-2 py-1 border border-gray-300 bg-gray-50 text-black font-medium'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <div className='flex justify-center'>
                  <input
                    onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                    className='border border-gray-300 px-1 py-1 sm:px-2 sm:py-2 text-center w-12 sm:w-16 focus:outline-none focus:ring-1 focus:ring-black'
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />
                </div>
                <div className='flex justify-end'>
                  <svg
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className='w-5 h-5 cursor-pointer text-gray-400 hover:text-red-500 transition-colors'
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
              </div>
            )
          })
        )}
      </div>

      {cartData.length > 0 && (
        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[500px] border border-gray-200 p-8 bg-gray-50'>
            <h2 className='text-xl sm:text-2xl uppercase tracking-widest font-bold mb-6 pb-4 border-b border-gray-300 text-gray-900'>Order Summary</h2>
            <div className='flex flex-col gap-4 text-sm font-light tracking-wide uppercase'>
              <div className='flex justify-between'>
                <p>Subtotal</p>
                <p className="font-medium tracking-widest">${getCartAmount().toFixed(2)}</p>
              </div>
              <hr className="border-gray-200" />
              <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p className="font-medium tracking-widest">$10.00</p>
              </div>
              <hr className="border-gray-200" />
              <div className='flex justify-between mb-4'>
                <p className='font-bold text-base text-gray-900'>Total</p>
                <p className="font-bold text-base tracking-widest text-gray-900">${(getCartAmount() === 0 ? 0 : getCartAmount() + 10).toFixed(2)}</p>
              </div>
            </div>
            <div className='w-full text-end mt-4'>
              <button className='bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-widest px-8 py-5 hover:bg-gray-800 transition-colors w-full'>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
