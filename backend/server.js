import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shwag');
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',        // local Vite dev server
    'http://localhost:3000',        // local preview
    /\.vercel\.app$/,               // all *.vercel.app domains (covers preview deploys)
  ],
  credentials: true,
}));
app.use(express.json()); // Parses incoming JSON requests

// Define Routes
app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => res.send('API Running'));

// Server configurations
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
