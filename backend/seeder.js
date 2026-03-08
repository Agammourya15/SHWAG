import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const users = [
    {
        name: 'Admin User',
        email: 'admin@shwag.com',
        password: 'password123',
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
    }
];

const products = [
    // WOMEN PRODUCTS
    {
        name: 'Premium Evening Gown',
        image: ['/assets/BalckDressCoverpage.jpg'],
        description: 'An elegant black evening gown with delicate mesh overlay.',
        category: 'Women',
        subCategory: 'Dresses',
        price: 199.99,
        countInStock: 10,
    },
    {
        name: 'Blue Party Dress',
        image: ['/assets/bluecoverpage.jpg'],
        description: 'Stunning blue party dress for special occasions.',
        category: 'Women',
        subCategory: 'Dresses',
        price: 149.99,
        countInStock: 5,
    },
    {
        name: 'Golden Elegant Wear',
        image: ['/assets/goldencoverpage.jpg'],
        description: 'Beautiful golden dress with premium fabric.',
        category: 'Women',
        subCategory: 'Dresses',
        price: 179.99,
        countInStock: 8,
    },
    {
        name: 'Casual V-Neck Top',
        image: ['/assets/coverpageimg.jpg'],
        description: 'Comfortable everyday wear top for women.',
        category: 'Women',
        subCategory: 'Topwear',
        price: 49.99,
        countInStock: 15,
    },
    {
        name: 'Ribbed Long-Sleeve Top',
        image: ['/assets/woman/1256115001-202410-PP-0063.jpg'],
        description: 'Fitted ribbed top perfect for layering or wearing alone.',
        category: 'Women',
        subCategory: 'Topwear',
        price: 24.99,
        countInStock: 25,
    },
    {
        name: 'Classic White Shirt',
        image: ['/assets/woman/1283780001-202502-PP-0065.jpg'],
        description: 'A wardrobe staple. Crisp, clean, versatile white shirt.',
        category: 'Women',
        subCategory: 'Topwear',
        price: 34.99,
        countInStock: 20,
    },
    {
        name: 'Satin Finish Blouse',
        image: ['/assets/woman/1309077001-202502-PP-0078.jpg'],
        description: 'Elegant satin blouse with a graceful drape.',
        category: 'Women',
        subCategory: 'Topwear',
        price: 44.99,
        countInStock: 12,
    },
    {
        name: 'Wide-Leg Tailored Trousers',
        image: ['/assets/womantrousers/1313746002-202502-PP-0036.jpg'],
        description: 'Sophisticated wide-leg trousers for a sharp, modern look.',
        category: 'Women',
        subCategory: 'Trousers',
        price: 59.99,
        countInStock: 18,
    },
    {
        name: 'Straight Fit Suit Pants',
        image: ['/assets/womantrousers/1317761001-202502-PP-0075.jpg'],
        description: 'Classic straight fit pants, ideal for the office.',
        category: 'Women',
        subCategory: 'Trousers',
        price: 49.99,
        countInStock: 22,
    },
    {
        name: 'High-Waisted Culottes',
        image: ['/assets/womantrousers/1319643001-202502-PP-0103.jpg'],
        description: 'Trendy high-waisted culottes offering comfort and style.',
        category: 'Women',
        subCategory: 'Trousers',
        price: 45.99,
        countInStock: 15,
    },
    {
        name: 'Relaxed Fit Cargo Pants',
        image: ['/assets/womantrousers/1321044001-202502-PP-0064.jpg'],
        description: 'Casual, utility-inspired cargo pants with ample pocket space.',
        category: 'Women',
        subCategory: 'Trousers',
        price: 54.99,
        countInStock: 30,
    },
    // MEN PRODUCTS
    {
        name: 'Winter Atelier Coat',
        image: ['/assets/men/HMAtelierWinter.jpg'],
        description: 'Premium winter atelier coat for men. Stay warm in style.',
        category: 'Men',
        subCategory: 'Winterwear',
        price: 299.99,
        countInStock: 12,
    },
    {
        name: 'Leather Atelier Jacket',
        image: ['/assets/men/HMLeatherAtelierWinter.jpg'],
        description: 'High-quality leather jacket from our Winter Atelier collection.',
        category: 'Men',
        subCategory: 'Jackets',
        price: 349.99,
        countInStock: 7,
    },
    {
        name: 'Men Move Running Top',
        image: ['/assets/men/sports/HM-Move-Mens-running-AW25-1291853001.jpg'],
        description: 'Breathable, moisture-wicking top for your everyday runs.',
        category: 'Men',
        subCategory: 'Running',
        price: 59.99,
        countInStock: 20,
    },
    {
        name: 'Men Move Active Jacket',
        image: ['/assets/men/sports/HM-Move-Mens-running-AW25-1291853002.jpg'],
        description: 'Lightweight zip-up jacket designed for athletic performance.',
        category: 'Men',
        subCategory: 'Running',
        price: 89.99,
        countInStock: 15,
    },
    {
        name: 'Men Move Performance Tee',
        image: ['/assets/men/sports/HM-Move-Mens-running-AW25-1298916001.jpg'],
        description: 'Premium fabric tee that keeps you cool during intense workouts.',
        category: 'Men',
        subCategory: 'Running',
        price: 45.99,
        countInStock: 25,
    },
    {
        name: 'Men Move Running Shorts',
        image: ['/assets/men/sports/shorts/HM-Move-Mens-running-AW25-1255779002.jpg'],
        description: 'Comfortable fit running shorts with inner brief and secure pockets.',
        category: 'Men',
        subCategory: 'Shorts',
        price: 39.99,
        countInStock: 30,
    },
    {
        name: 'Men Move Training Shorts',
        image: ['/assets/men/sports/shorts/HM-Move-Mens-running-AW25-1299570001.jpg'],
        description: 'Flexible athletic shorts suitable for gym or tracks.',
        category: 'Men',
        subCategory: 'Shorts',
        price: 34.99,
        countInStock: 18,
    },
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shwag');
        console.log('MongoDB Connected for Seeding...');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await connectDB();

        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        await User.insertMany(users);

        // Dynamically add remaining women images
        const womanAssetsDir = path.join(__dirname, '../frontend/src/assets/woman');
        const existingWomanImages = products.filter(p => p.image[0].includes('/assets/woman/')).map(p => path.basename(p.image[0]));
        try {
            const womanFiles = fs.readdirSync(womanAssetsDir);
            womanFiles.forEach((file, index) => {
                if (file.endsWith('.jpg') || file.endsWith('.png')) {
                    if (!existingWomanImages.includes(file)) {
                        let subCategory = index % 2 === 0 ? 'Dresses' : 'Topwear';
                        let name = `Women Premium Style ${index + 1}`;
                        if (file.includes('Dance-collection')) {
                            subCategory = 'Topwear';
                            name = `Women Activewear Top ${index + 1}`;
                        }

                        products.push({
                            name,
                            image: [`/assets/woman/${file}`],
                            description: 'Premium piece from our new women fashion collection.',
                            category: 'Women',
                            subCategory,
                            price: 39.99 + (index % 5) * 10,
                            countInStock: 10 + (index % 10)
                        });
                    }
                }
            });
        } catch (e) {
            console.error('Error reading dynamic woman assets:', e.message);
        }

        await Product.insertMany(products);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error.message}`);
        process.exit(1);
    }
};

importData();
