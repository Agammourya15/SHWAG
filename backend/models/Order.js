import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    name:    { type: String, required: true },
    qty:     { type: Number, required: true },
    image:   { type: String, required: true },
    price:   { type: Number, required: true },
    size:    { type: String, default: '' },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
});

const shippingAddressSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true },
    phone:     { type: String, required: true },
    address:   { type: String, required: true },
    city:      { type: String, required: true },
    state:     { type: String, required: true },
    pincode:   { type: String, required: true },
}, { _id: false });

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    orderItems:      [orderItemSchema],
    shippingAddress: { type: shippingAddressSchema, required: true },
    paymentMethod:   { type: String, required: true, default: 'COD' },
    totalPrice:      { type: Number, required: true, default: 0.0 },
    shippingPrice:   { type: Number, required: true, default: 0.0 },
    isPaid:          { type: Boolean, required: true, default: false },
    paidAt:          { type: Date },
    isDelivered:     { type: Boolean, required: true, default: false },
    deliveredAt:     { type: Date },
    status: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing',
    },
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
export default Order;
