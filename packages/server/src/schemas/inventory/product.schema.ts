import { model, Schema, Types } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    seller: { type: Types.ObjectId, ref: 'seller', required: true },
    stock_quantity: { type: Number, required: true, default: 0 },
    barcode: { type: String, unique: true, sparse: true }, 
    admin_category: { type: Types.ObjectId, ref: 'admin_category', required: true },
    category: { type: Types.ObjectId, ref: 'category', required: true },
    images: [{ type: String }],
    status: { type: String, enum: ['In Stock', 'Out of Stock', 'Low Stock'], default: 'In Stock'},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const ProductModel = model('product', ProductSchema);
export default ProductModel;