import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Package, ChevronRight, ShoppingBag } from 'lucide-react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const STATUS_COLORS = {
  Processing: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Shipped:    'bg-blue-50 text-blue-700 border-blue-200',
  Delivered:  'bg-green-50 text-green-700 border-green-200',
  Cancelled:  'bg-red-50 text-red-700 border-red-200',
};

const Order = () => {
  const { token } = useContext(ShopContext);
  const navigate  = useNavigate();
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${BACKEND}/api/orders/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white pt-[88px]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-10 pb-24">

        {/* Header */}
        <div className="flex items-end justify-between pb-5 border-b-2 border-black mb-10">
          <div>
            <p className="text-[11px] font-bold tracking-[0.35em] uppercase text-gray-400 mb-1">SHWAG</p>
            <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-wide text-black">My Orders</h1>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'}
          </span>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="border border-gray-100 p-6 animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-1/4 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-1/3 mb-6" />
                <div className="flex gap-4">
                  <div className="w-20 h-24 bg-gray-100 rounded" />
                  <div className="flex-1 space-y-2 py-2">
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-200 mb-6" strokeWidth={1} />
            <h2 className="text-xl font-bold uppercase tracking-widest text-gray-800 mb-2">No orders yet</h2>
            <p className="text-sm text-gray-400 font-light mb-8 tracking-wide">
              When you place an order, it will appear here.
            </p>
            <Link to="/" className="hm-btn-black">Start Shopping</Link>
          </div>
        )}

        {/* Orders list */}
        {!loading && orders.length > 0 && (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div key={order._id} className="border border-gray-200 hover:border-black transition-colors">

                {/* Order header */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <div className="flex flex-wrap gap-6 text-xs">
                    <div>
                      <p className="text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Order Placed</p>
                      <p className="font-bold text-black">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Total</p>
                      <p className="font-bold text-black">₹{order.totalPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Payment</p>
                      <p className="font-bold text-black">{order.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 border ${STATUS_COLORS[order.status] || STATUS_COLORS.Processing}`}>
                      {order.status || 'Processing'}
                    </span>
                  </div>
                </div>

                {/* Order items */}
                <div className="px-6 py-5 flex flex-col gap-5">
                  {order.orderItems.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 sm:w-20 aspect-[3/4] object-cover bg-gray-50 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold uppercase tracking-wide text-black leading-tight">{item.name}</p>
                        <div className="flex flex-wrap gap-4 mt-1.5 text-xs text-gray-500 uppercase tracking-widest">
                          {item.size && <span>Size: <span className="font-bold text-black">{item.size}</span></span>}
                          <span>Qty: <span className="font-bold text-black">{item.qty}</span></span>
                          <span>₹<span className="font-bold text-black">{(item.price * item.qty).toFixed(2)}</span></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping address footer */}
                {order.shippingAddress && (
                  <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">Shipping to</p>
                    <p className="text-xs text-gray-700 font-semibold">
                      {order.shippingAddress.firstName} {order.shippingAddress.lastName} &nbsp;·&nbsp;
                      {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.pincode}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Continue shopping */}
        {!loading && orders.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/"
              className="text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-black transition-colors underline underline-offset-4"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
