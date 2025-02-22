import { model, Schema, Types } from "mongoose";

const AgentSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, requried: true },
    sellers: [{ type: Types.ObjectId, ref: "seller", required: true }],
    createdAt: { type: Date, default: Date.now },
});

const AgentModel = model("delivery_agent", AgentSchema);
export default AgentModel;