import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CheckCircle, Truck, CreditCard, ChevronRight } from 'lucide-react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra',
  'Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim',
  'Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Delhi','Jammu & Kashmir','Ladakh','Chandigarh','Puducherry',
];

const SHIPPING_FEE = 10;

const PlaceOrder = () => {
  const { products, cartItems, getCartAmount, clearCart, token } = useContext(ShopContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', address: '', city: '', state: '', pincode: '',
  });

  // Redirect if not logged in or cart is empty
  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    const hasItems = Object.values(cartItems).some(sizes =>
      Object.values(sizes).some(qty => qty > 0)
    );
    if (!hasItems) { navigate('/cart'); }
  }, [token, cartItems]);

  const subtotal = getCartAmount();
  const shipping = subtotal > 499 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  // Build flat cart list for display + order payload
  const cartList = [];
  for (const itemId in cartItems) {
    for (const size in cartItems[itemId]) {
      if (cartItems[itemId][size] > 0) {
        const product = products.find(p => p._id === itemId);
        if (product) {
          cartList.push({ product, size, quantity: cartItems[itemId][size] });
        }
      }
    }
  }

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Basic validation
    if (Object.values(form).some(v => !v.trim())) {
      toast.error('Please fill in all shipping details'); return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      toast.error('Enter a valid 10-digit phone number'); return;
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      toast.error('Enter a valid 6-digit PIN code'); return;
    }

    setLoading(true);
    try {
      const orderItems = cartList.map(({ product, size, quantity }) => ({
        name:    product.name,
        qty:     quantity,
        image:   product.image[0],
        price:   product.price,
        size,
        product: product._id,
      }));

      const { data } = await axios.post(
        `${BACKEND}/api/orders`,
        { orderItems, shippingAddress: form, paymentMethod: 'COD', shippingPrice: shipping, totalPrice: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrderId(data._id);
      clearCart();
      setOrderDone(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Order Success Screen ────────────────────────────────────────────────────
  if (orderDone) {
    return (
      <div className="min-h-screen bg-white pt-[88px] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center py-16">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <p className="text-[11px] font-bold tracking-[0.35em] uppercase text-gray-400 mb-2">Order Confirmed</p>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-black mb-4">
            Thank You!
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-2">
            Your order has been placed successfully.
          </p>
          <p className="text-xs text-gray-400 mb-1 font-mono">Order ID: <span className="text-black font-bold">{orderId}</span></p>
          <p className="text-xs text-gray-400 mb-10">
            Payment: <span className="font-bold text-black">Cash on Delivery</span> &nbsp;·&nbsp; Our team will contact you shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/orders')}
              className="hm-btn-red px-8 py-3.5 text-sm"
            >
              View My Orders
            </button>
            <button
              onClick={() => navigate('/')}
              className="hm-btn-white px-8 py-3.5 text-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Checkout Form ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white pt-[88px]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-10 pb-24">

        {/* Header */}
        <div className="pb-5 border-b-2 border-black mb-10">
          <p className="text-[11px] font-bold tracking-[0.35em] uppercase text-gray-400 mb-1">SHWAG</p>
          <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-wide text-black">Checkout</h1>
        </div>

        {/* Breadcrumb steps */}
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold mb-10 text-gray-400">
          <span className="text-black">Shipping</span>
          <ChevronRight className="w-3 h-3" />
          <span>Payment</span>
          <ChevronRight className="w-3 h-3" />
          <span>Confirm</span>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* ── LEFT: Shipping Address ───────────────────────────────── */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="w-5 h-5 text-black" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-black">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: 'First Name', name: 'firstName', col: 1 },
                  { label: 'Last Name',  name: 'lastName',  col: 1 },
                ].map(({ label, name }) => (
                  <FormField key={name} label={label} name={name} value={form[name]} onChange={handleChange} />
                ))}

                <div className="sm:col-span-2">
                  <FormField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} />
                </div>

                <div className="sm:col-span-2">
                  <FormField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" />
                </div>

                <div className="sm:col-span-2">
                  <FormField label="Street Address / Flat / Building" name="address" value={form.address} onChange={handleChange} />
                </div>

                <FormField label="City" name="city" value={form.city} onChange={handleChange} />

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-700">State</label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                    className="w-full border-b-2 border-gray-300 focus:border-black focus:outline-none py-2.5 text-sm text-gray-900 bg-transparent transition-colors"
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <FormField label="PIN Code" name="pincode" value={form.pincode} onChange={handleChange} placeholder="6-digit PIN" />
              </div>

              {/* Payment Method */}
              <div className="mt-10">
                <div className="flex items-center gap-3 mb-5">
                  <CreditCard className="w-5 h-5 text-black" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-black">Payment Method</h2>
                </div>
                <div className="border-2 border-black bg-gray-50 p-4 flex items-center gap-4">
                  <div className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2.5 h-2.5 bg-black rounded-full" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-black">Cash on Delivery</p>
                    <p className="text-xs text-gray-500 mt-0.5">Pay when your order arrives at your doorstep</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Order Summary ─────────────────────────────────── */}
            <div className="lg:w-80 xl:w-96">
              <div className="border border-gray-200 p-6 sticky top-28">
                <h2 className="text-sm font-bold uppercase tracking-widest text-black pb-4 border-b border-gray-200 mb-4">
                  Order Summary
                </h2>

                {/* Cart items */}
                <div className="flex flex-col gap-4 mb-5 max-h-64 overflow-y-auto">
                  {cartList.map(({ product, size, quantity }, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <img src={product.image[0]} alt={product.name} className="w-14 aspect-[3/4] object-cover bg-gray-50 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wide text-black leading-tight truncate">{product.name}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-widest">Size: {size} · Qty: {quantity}</p>
                        <p className="text-xs font-bold text-black mt-1">₹{(product.price * quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="flex flex-col gap-2.5 text-sm border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-semibold">
                      {shipping === 0 ? <span className="text-green-600">FREE</span> : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal > 0 && subtotal <= 499 && (
                    <p className="text-xs text-[#E50010] font-semibold">
                      Add ₹{(499 - subtotal).toFixed(2)} more for free delivery!
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center py-4 border-t-2 border-black mt-3 mb-5">
                  <span className="text-sm font-bold uppercase tracking-widest">Total</span>
                  <span className="text-lg font-bold">₹{total.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="hm-btn-red w-full text-center py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Placing Order...
                    </span>
                  ) : 'Place Order'}
                </button>

                <p className="text-[11px] text-gray-400 text-center mt-4 leading-relaxed">
                  By placing your order you agree to our Terms & Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Small reusable input component ─────────────────────────────────────────────
const FormField = ({ label, name, type = 'text', value, onChange, placeholder = '' }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full border-b-2 border-gray-300 focus:border-black focus:outline-none py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-transparent transition-colors"
    />
  </div>
);

export default PlaceOrder;
