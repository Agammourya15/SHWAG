import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MegaDropdownNavbar } from './components/ui/navbar-with-animated-mega-dropdown.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Collection from './pages/Collection.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import AdminAddProduct from './pages/AdminAddProduct.jsx';
import Profile from './pages/Profile.jsx';
import Beauty from './pages/Beauty.jsx';
import LipEssentials from './pages/LipEssentials.jsx';
import Fragrance from './pages/Fragrance.jsx';
import AllBeauty from './pages/AllBeauty.jsx';
import AuthCallback from './pages/AuthCallback.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import Order from './pages/Order.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className='relative w-full min-h-screen flex flex-col font-sans bg-white'>
      <ToastContainer />
      <MegaDropdownNavbar />
      <div className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/women' element={<Collection category="Women" />} />
          <Route path='/men' element={<Collection category="Men" />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin/add-product' element={<AdminAddProduct />} />
          <Route path='/beauty' element={<Beauty />} />
          <Route path='/beauty/lip-essentials' element={<LipEssentials />} />
          <Route path='/beauty/fragrance' element={<Fragrance />} />
          <Route path='/beauty/all' element={<AllBeauty />} />
          <Route path='/auth/callback' element={<AuthCallback />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Order />} />
          <Route path='/contact' element={<div className="h-screen flex items-center justify-center pt-16">Contact Form Here</div>} />
          <Route path='/help' element={<div className="h-screen flex items-center justify-center pt-16">Help Center Here</div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App;