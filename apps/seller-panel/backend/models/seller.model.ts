import { model, models, Schema } from "mongoose";

const SellerSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  businessType: {
    type: String,
    required: true,
  },
  businessAddress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
});

export const SellerModel = models?.seller || model("seller", SellerSchema);
