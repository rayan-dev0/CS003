import { model, Schema, Types } from "mongoose";

const OrderSchema = new Schema({
    customerId: { type: Types.ObjectId, ref: 'Customer', required: true },
    sellerId: { type: Types.ObjectId, ref: 'Seller', required: true},
    agentId: { type: Types.ObjectId, ref: 'Agent' },
    items: [{
        productId: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        name: { type: String, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'ready_for_pickup', 'out_for_delivery', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'online'],
        required: true
    },
    deliveryAddress: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const OrderModel = model("order", OrderSchema);
export default OrderModel;