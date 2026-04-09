import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { useNavigate } from 'react-router-dom';
import { 
  User, Package, Heart, Tag, CreditCard, Star, LifeBuoy, ChevronRight, 
  LogOut, Shield, Zap, Gift, CheckCircle2, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const { token, setToken, user, setUser } = useContext(ShopContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // If not logged in, you could redirect or show a message.
  // For now, we assume if they can access it, they are logged in.
  // if (!token) navigate('/login');

  const tabs = [
    { id: 'overview', label: 'Profile Overview', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'coupons', label: 'Coupons & Offers', icon: Tag },
    { id: 'finance', label: 'Finance Options', icon: CreditCard },
    { id: 'prime', label: 'Prime Membership', icon: Star },
    { id: 'help', label: 'Help Center', icon: LifeBuoy },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    navigate('/login');
  };

  // Content Components
  const OverviewTab = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex items-center gap-6">
          <div className="h-20 w-20 bg-gradient-to-tr from-rose-500 to-[#E50010] rounded-full flex items-center justify-center text-3xl font-bold shadow-lg shadow-red-500/30 ring-4 ring-white/10">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-1">{user?.name || 'Valued Customer'}</h2>
            <p className="text-gray-400 font-medium tracking-wide">{user?.email || 'user@example.com'}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-semibold tracking-wider text-blue-100 uppercase">Verified Member</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 cursor-pointer" onClick={() => setActiveTab('orders')}>
          <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-black">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-1">2 Orders</h3>
          <p className="text-sm text-gray-500 font-medium">In transit & delivered</p>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 cursor-pointer" onClick={() => setActiveTab('wishlist')}>
          <div className="h-12 w-12 bg-rose-50 rounded-full flex items-center justify-center mb-4 text-[#E50010]">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-1">12 Items</h3>
          <p className="text-sm text-gray-500 font-medium">Saved to wishlist</p>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 cursor-pointer" onClick={() => setActiveTab('coupons')}>
          <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-600">
            <Tag className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-1">3 Offers</h3>
          <p className="text-sm text-gray-500 font-medium">Coupons available</p>
        </motion.div>
      </div>
    </div>
  );

  const OrdersTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Your Orders</h2>
      <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-4">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">No active orders right now</h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">Looks like you haven't made your choice yet. Explore our latest collections to find something you'll love.</p>
        <button onClick={() => navigate('/')} className="bg-black text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#E50010] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300">
          Start Shopping
        </button>
      </div>
    </div>
  );

  const WishlistTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Your Wishlist</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="aspect-[4/5] bg-gray-100 relative">
              <img src={`https://images.unsplash.com/photo-1515${item}88879684-21142273abcf?w=500&auto=format&fit=crop&q=60`} alt="Product" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
              <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md text-[#E50010]">
                <Heart className="w-4 h-4 fill-current" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 truncate">Premium Collection Item {item}</h3>
              <p className="text-sm font-bold mt-1 text-gray-600">₹2,499</p>
              <button className="w-full mt-4 bg-gray-900 hover:bg-black text-white py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors">
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CouponsTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Coupons & Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { code: 'SHWAGNEW20', desc: 'Flat 20% off on your first order', expire: '3 days' },
          { code: 'HDFCFESTIVE', desc: '10% instant discount on HDFC cards', expire: '1 week' },
        ].map((coupon, i) => (
          <div key={i} className="relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#E50010]"></div>
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block px-3 py-1 bg-red-50 text-[#E50010] text-xs font-bold tracking-widest uppercase rounded border border-red-100 mb-3 block w-fit">
                  {coupon.code}
                </span>
                <p className="font-bold text-gray-900 mb-1">{coupon.desc}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Expires in {coupon.expire}
                </p>
              </div>
              <button className="text-xs font-bold uppercase tracking-widest text-black hover:text-[#E50010] transition-colors bg-gray-50 px-4 py-2 rounded group-hover:bg-gray-100">
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const FinanceTab = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold tracking-tight mb-2">Finance & Credit Options</h2>
      <p className="text-gray-500 mb-8 max-w-2xl">Access exclusive credit lines, EMI options, and co-branded credit cards for a seamless shopping experience.</p>
      
      {/* Axis Card Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-3xl p-8 pb-0 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between group">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50"></div>
        
        <div className="z-10 md:w-1/2 pb-8 pr-4">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md mb-6">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-100">Partner Offer</span>
          </div>
          <h3 className="text-3xl font-bold mb-3 leading-tight tracking-tight">SHWAG <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">Axis Bank</span> Credit Card</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Flat 5% Cashback on all SHWAG purchases</li>
            <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Welcome voucher worth ₹1,000</li>
            <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Zero joining fee for limited time</li>
          </ul>
          <button className="bg-white text-black px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 w-full md:w-auto text-center">
            Apply Now
          </button>
        </div>
        
        <div className="z-10 md:w-1/2 relative h-64 w-full mt-8 md:mt-0 perspective-1000">
          <motion.div 
            initial={{ rotateY: 15, rotateX: 5 }}
            whileHover={{ rotateY: 0, rotateX: 0, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute right-0 md:-right-10 top-10 w-80 h-48 bg-gradient-to-br from-emerald-600 to-teal-900 rounded-2xl shadow-2xl border border-white/20 p-5 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <span className="text-xl font-bold tracking-widest">SHWAG</span>
              <span className="text-xs font-semibold tracking-wider opacity-80">axis bank</span>
            </div>
            <div className="w-12 h-8 bg-yellow-400/80 rounded-sm"></div>
            <div>
              <p className="font-mono text-lg tracking-[0.2em] mb-1 opacity-90">4642 34XX XXXX 9012</p>
              <div className="flex justify-between items-center text-xs opacity-80 font-medium tracking-widest uppercase">
                <span>{user?.name || 'CARDHOLDER'}</span>
                <span>VISA</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Personal Loan / EMI option */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Zap className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Personal Loan EMI</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">Pre-approved credit line up to ₹50,000 for everyone. Convert your purchases into easy 3, 6, or 9 month EMIs instantly at checkout.</p>
          <button className="text-blue-600 font-bold text-sm tracking-widest uppercase flex items-center gap-1 group-hover:gap-3 transition-all">
            Check Eligibility <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Gift className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Buy Now, Pay Later</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">Shop your favorites today and pay after 15 days with 0% interest. Seamless one-click checkout experience.</p>
          <button className="text-purple-600 font-bold text-sm tracking-widest uppercase flex items-center gap-1 group-hover:gap-3 transition-all">
            Activate BNPL <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const PrimeTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#111] text-white rounded-3xl p-10 relative overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-yellow-500/20 via-transparent to-transparent opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-200 to-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              <Star className="w-3.5 h-3.5 fill-current" /> Premium Tier
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">SHWAG<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 italic">Prime</span></h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md">Elevate your fashion journey. Get free expedited shipping, early access to drops, and exclusive priority support.</p>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md mb-8">
              <div className="flex items-end gap-2 mb-4">
                <span className="text-3xl font-bold text-white">₹999</span>
                <span className="text-gray-400 font-medium mb-1">/ year</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-5 h-5 text-amber-400" /> Free Next-Day Delivery</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-5 h-5 text-amber-400" /> 24-Hour Early Access to Sales</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-5 h-5 text-amber-400" /> VIP Customer Support Line</li>
              </ul>
            </div>
            
            <button className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center">
              Join Prime Now
            </button>
          </div>
          
          <div className="md:w-1/2 relative w-full aspect-square md:aspect-auto md:h-96 rounded-2xl overflow-hidden border border-white/10">
            <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80" alt="Prime Fashion" className="object-cover w-full h-full opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const HelpTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Help Center</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Track Order', desc: 'Find out where your package is', icon: Package },
          { title: 'Returns & Refunds', desc: 'Return items up to 14 days', icon: LogOut },
          { title: 'Payment Issues', desc: 'Troubleshoot payment failures', icon: CreditCard },
          { title: 'Account Settings', desc: 'Update details & passwords', icon: User },
          { title: 'Contact Us', desc: 'Talk to our support team', icon: LifeBuoy },
        ].map((item, i) => (
          <div key={i} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-black transition-colors cursor-pointer group">
            <item.icon className="w-8 h-8 text-gray-400 mb-4 group-hover:text-black transition-colors" />
            <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-xs text-gray-500 line-clamp-2">{item.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-50 rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-blue-100">
        <h3 className="text-xl font-bold text-blue-900 mb-2">Need immediate assistance?</h3>
        <p className="text-blue-700/80 text-sm mb-6 max-w-md">Our customer service team is available 24/7 to help you with any queries or concerns.</p>
        <button className="bg-blue-600 text-white font-bold text-sm tracking-widest uppercase px-8 py-3.5 rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-600/30">
          Start Live Chat
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-[108px] pb-16">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-8 mb-8">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold uppercase tracking-widest text-black">My Account</h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">Manage your orders, profile, and exclusive offers.</p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Tabs */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-[112px]">
              <nav className="flex flex-col space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                      activeTab === tab.id 
                        ? 'bg-black text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`} />
                    {tab.label}
                  </button>
                ))}
                
                <div className="my-2 border-t border-gray-100 h-px"></div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Log Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'overview' && <OverviewTab />}
                {activeTab === 'orders' && <OrdersTab />}
                {activeTab === 'wishlist' && <WishlistTab />}
                {activeTab === 'coupons' && <CouponsTab />}
                {activeTab === 'finance' && <FinanceTab />}
                {activeTab === 'prime' && <PrimeTab />}
                {activeTab === 'help' && <HelpTab />}
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
