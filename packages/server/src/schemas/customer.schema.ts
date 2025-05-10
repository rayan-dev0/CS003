import { model, Schema } from "mongoose";

const CustomerSchema = new Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, requried: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const CustomerModel = model("customer", CustomerSchema);
export default CustomerModel;