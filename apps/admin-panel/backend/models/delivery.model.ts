import { model, models, Schema, Types } from "mongoose";

const DeliverySchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, requried: true },
    sellers: [{ type: String, ref: "seller", required: true }],
    createdAt: { type: Date, default: Date.now },
});

const DeliveryModel = models.delivery_boy || model("delivery_boy", DeliverySchema);
export default DeliveryModel;