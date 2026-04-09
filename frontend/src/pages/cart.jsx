import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { toast } from 'react-toastify';

const Cart = () => {
  const { products, cartItems, updateQuantity, getCartAmount, token } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({ _id: itemId, size, quantity: cartItems[itemId][size] });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const shippingFee = 10;
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + shippingFee;

  return (
    <div className='bg-white min-h-screen pt-[88px]'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-10 pb-24'>

        {/* Header */}
        <div className='flex items-end justify-between pb-5 border-b-2 border-black mb-8'>
          <h1 className='text-3xl sm:text-4xl font-bold uppercase tracking-wide text-black'>Shopping Bag</h1>
          <span className='text-xs font-bold uppercase tracking-widest text-gray-500'>{cartData.length} {cartData.length === 1 ? 'item' : 'items'}</span>
        </div>

        {cartData.length === 0 ? (
          /* Empty cart */
          <div className='flex flex-col items-center justify-center py-24 text-center'>
            <ShoppingBag className='w-16 h-16 text-gray-200 mb-6' strokeWidth={1} />
            <h2 className='text-xl font-bold uppercase tracking-widest text-gray-800 mb-2'>Your bag is empty</h2>
            <p className='text-sm text-gray-400 font-light mb-8 tracking-wide'>Add something you love to get started!</p>
            <Link to='/' className='hm-btn-black'>Continue Shopping</Link>
          </div>
        ) : (
          <div className='flex flex-col lg:flex-row gap-10 lg:gap-16'>

            {/* ── Cart Items ─────────────────────────────────────────────── */}
            <div className='flex-1'>
              {cartData.map((item, index) => {
                const product = products.find(p => p._id === item._id);
                if (!product) return null;
                return (
                  <div key={index} className='flex gap-4 sm:gap-6 py-6 border-b border-gray-100 items-start'>
                    {/* Image */}
                    <Link to={`/product/${product._id}`} className='flex-shrink-0'>
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className='w-24 sm:w-32 aspect-[3/4] object-cover bg-gray-50 hover:opacity-90 transition-opacity'
                      />
                    </Link>

                    {/* Info */}
                    <div className='flex-1 flex flex-col justify-between min-h-[120px]'>
                      <div>
                        <p className='text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-1'>{product.category}</p>
                        <Link to={`/product/${product._id}`}>
                          <h3 className='text-sm sm:text-base font-bold uppercase tracking-widest text-black hover:text-gray-600 transition-colors leading-tight mb-1'>
                            {product.name}
                          </h3>
                        </Link>
                        <p className='text-xs text-gray-500 uppercase tracking-widest font-semibold'>Size: {item.size}</p>
                      </div>

                      <div className='flex items-end justify-between mt-4'>
                        {/* Qty stepper */}
                        <div className='flex items-center border border-gray-300'>
                          <button
                            className='w-8 h-8 flex items-center justify-center text-black hover:bg-gray-50 transition-colors'
                            onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}
                          >
                            <Minus className='w-3 h-3' />
                          </button>
                          <span className='w-10 text-center text-sm font-semibold'>{item.quantity}</span>
                          <button
                            className='w-8 h-8 flex items-center justify-center text-black hover:bg-gray-50 transition-colors'
                            onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          >
                            <Plus className='w-3 h-3' />
                          </button>
                        </div>

                        <div className='flex items-center gap-4'>
                          <span className='text-sm font-bold text-black'>₹{(product.price * item.quantity).toFixed(2)}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.size, 0)}
                            className='text-gray-400 hover:text-[#E50010] transition-colors p-1'
                            aria-label='Remove item'
                          >
                            <Trash2 className='w-4 h-4' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Order Summary ──────────────────────────────────────────── */}
            <div className='lg:w-80 xl:w-96'>
              <div className='border border-gray-200 p-6 sticky top-28'>
                <h2 className='text-sm font-bold uppercase tracking-widest text-black pb-4 border-b border-gray-200 mb-4'>
                  Order Summary
                </h2>

                <div className='flex flex-col gap-3 text-sm mb-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600 tracking-wide'>Subtotal</span>
                    <span className='font-semibold text-black'>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600 tracking-wide'>Delivery</span>
                    <span className='font-semibold text-black'>
                      {subtotal > 499 ? <span className='text-green-600'>FREE</span> : `₹${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal > 0 && subtotal <= 499 && (
                    <p className='text-xs text-[#E50010] font-semibold tracking-wide'>
                      Add ₹{(499 - subtotal).toFixed(2)} more for free delivery!
                    </p>
                  )}
                </div>

                <div className='flex justify-between items-center py-4 border-t-2 border-black mb-5'>
                  <span className='text-base font-bold uppercase tracking-widest text-black'>Total</span>
                  <span className='text-lg font-bold text-black'>₹{total.toFixed(2)}</span>
                </div>

                {/* Promo code */}
                <div className='flex gap-0 mb-5'>
                  <input
                    type='text'
                    placeholder='Promo code'
                    className='flex-1 border border-gray-300 px-3 py-2.5 text-xs uppercase tracking-widest focus:outline-none focus:border-black'
                  />
                  <button className='bg-black text-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors'>
                    Apply
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (!token) {
                      toast.error('Please sign in to proceed to checkout');
                      navigate('/login');
                      return;
                    }
                    navigate('/place-order');
                  }}
                  className='hm-btn-red w-full text-center py-4'
                >
                  Proceed to Checkout
                </button>

                <Link to='/' className='block text-center text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-black transition-colors mt-4 underline underline-offset-4'>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
