import { model, Schema, Types } from "mongoose";

const SubCategorySchema = new Schema({
    name: { type: String, required: true },
    seller: { type: Types.ObjectId, ref: 'seller', required: true },
    category: { type: Types.ObjectId, ref: 'category', required: true }
});

const SubCategoryModel = model('sub_category', SubCategorySchema);
export default SubCategoryModel;