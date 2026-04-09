import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminAddProduct = () => {
  const { token } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Women',
    subCategory: '',
    image: '',
    countInStock: '',
    isSold: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL 
    ? `${import.meta.env.VITE_BACKEND_URL}/api/products` 
    : 'https://backend-agammaurya15-7047s-projects.vercel.app/api/products';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      toast.error('You must be logged in to add products');
      return;
    }

    try {
        const productData = {
            ...formData,
            price: Number(formData.price),
            countInStock: Number(formData.countInStock),
            image: formData.image ? formData.image.split(',').map(i => i.trim()) : []
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };

        const res = await axios.post(API_BASE_URL, productData, config);
        if (res.status === 201) {
            toast.success("Product added successfully!");
            setFormData({
                name: '', description: '', price: '', category: 'Women', subCategory: '', image: '', countInStock: '', isSold: false
            });
        }
    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to add product (admin privileges required)');
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 pt-[88px] pb-16'>
      <div className='max-w-screen-md mx-auto px-4 mt-8'>
        <div className='bg-white p-8 border border-gray-200'>
            <h1 className='text-2xl font-bold uppercase tracking-widest text-black mb-8 border-b pb-4'>Add New Product</h1>
            
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className='flex flex-col gap-1'>
                <label className='text-xs font-bold uppercase tracking-widest text-gray-700'>Product Name</label>
                <input required type='text' name='name' value={formData.name} onChange={handleChange} className='border border-gray-300 p-2 text-sm focus:border-black outline-none' />
            </div>

            <div className='flex flex-col gap-1'>
                <label className='text-xs font-bold uppercase tracking-widest text-gray-700'>Description</label>
                <textarea required name='description' value={formData.description} onChange={handleChange} rows='3' className='border border-gray-300 p-2 text-sm focus:border-black outline-none' />
            </div>

            <div className='flex gap-4'>
                <div className='flex-1 flex flex-col gap-1'>
                    <label className='text-xs font-bold uppercase tracking-widest text-gray-700'>Price (₹)</label>
                    <input required type='number' name='price' value={formData.price} onChange={handleChange} min='0' className='border border-gray-300 p-2 text-sm focus:border-black outline-none' />
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <label className='text-xs font-bold uppercase tracking-widest text-gray-700'>Stock Count</label>
                    <input required type='number' name='countInStock' value={formData.countInStock} onChange={handleChange} min='0' className='border border-gray-300 p-2 text-sm focus:border-black outline-none' />
                </div>
            </div>

            <div className='flex gap-4'>
                <div className='flex-1 flex flex-col gap-1'>
                    <label className='text-xs font-bold uppercase tracking-widest text-gray-700'>Category</label>
                    <select name='category' value={formData.category} onChange={handleChange} className='border border-gray-300 p-2 text-sm focus:border-black outline-none bg-white'>
                        <option value='Women'>Women</option>
                        <option value='Men'>Men</option>
                    </select>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <label className='text-xs font-bold uppercase tracking-widest text-gray-700'>Sub-Category</label>
                    <input type='text' name='subCategory' value={formData.subCategory} onChange={handleChange} className='border border-gray-300 p-2 text-sm focus:border-black outline-none' placeholder='e.g. Dresses' />
                </div>
            </div>

            <div className='flex flex-col gap-1'>
                <label className='text-xs font-bold uppercase tracking-widest text-gray-700'>Image URLs (comma separated)</label>
                <input required type='text' name='image' value={formData.image} onChange={handleChange} className='border border-gray-300 p-2 text-sm focus:border-black outline-none' placeholder='https://example.com/img1.jpg, https://example.com/img2.jpg' />
            </div>

            <div className='flex items-center gap-2 mt-2'>
                <input type='checkbox' name='isSold' id='isSold' checked={formData.isSold} onChange={handleChange} className='w-4 h-4 cursor-pointer' />
                <label htmlFor='isSold' className='text-xs font-bold uppercase tracking-widest text-gray-700 cursor-pointer'>Mark as Sold Out</label>
            </div>

            <button type='submit' className='bg-black text-white font-bold uppercase tracking-widest py-4 mt-4 hover:bg-[#E50010] transition-colors'>
                Add Product (Admin)
            </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
