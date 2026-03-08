import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: [String],
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Men', 'Women']
    },
    subCategory: {
        type: String
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    isSold: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

export default Product;
