import { model, Schema, Types } from "mongoose";

const CategorySchema = new Schema({
    name: { type: String, required: true },
    seller: { type: Types.ObjectId, ref: 'seller', required: true },
    sub_categories: [{ type: Types.ObjectId, ref: 'category', required: true }]
});

const CategoryModel = model('category', CategorySchema);
export default CategoryModel;