import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, shippingPrice, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    if (!shippingAddress) {
        return res.status(400).json({ message: 'Shipping address is required' });
    }

    try {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod: paymentMethod || 'COD',
            shippingPrice: shippingPrice || 0,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
};

// @desc    Get all orders for logged-in user
// @route   GET /api/orders/mine
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error('Get my orders error:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order && order.user._id.equals(req.user._id)) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch order' });
    }
};

export { addOrderItems, getMyOrders, getOrderById };
