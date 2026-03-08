import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Collection from './pages/Collection.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='relative w-full min-h-screen flex flex-col font-sans bg-gray-50'>
      <ToastContainer />
      <Navbar />
      <div className="flex-grow pt-24"> {/* Added padding top for fixed navbar */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/women' element={<Collection category="Women" />} />
          <Route path='/men' element={<Collection category="Men" />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contact' element={<div className="h-screen flex items-center justify-center">Contact Form Here</div>} />
          <Route path='/help' element={<div className="h-screen flex items-center justify-center">Help Center Here</div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App;