import { model, Schema } from "mongoose";

const SellerSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    businessName: { type: String, required: true },
    businessType: { type: String, enum: ["Retail", "Wholesale", "Manufacturer", "Service", "Product", "Consultancy"], required: true },
    businessAddress: { type: String, required: true },
    phoneNumber: { type: String, requried: true },
    createdAt: { type: Date, default: Date.now },
});

const SellerModel = model("SellerModel", SellerSchema);
export default SellerModel;