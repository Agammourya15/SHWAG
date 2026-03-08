import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    // Optional category query: /api/products?category=Men
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i',
        },
    } : {};

    const categoryFilter = req.query.category ? { category: req.query.category } : {};

    const products = await Product.find({ ...keyword, ...categoryFilter });
    res.json(products);
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

export { getProducts, getProductById };
