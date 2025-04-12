import { model, Schema, Types } from "mongoose";

const AdminCategorySchema = new Schema({
    name: { type: String, required: true },
    categories: [{ type: Types.ObjectId, ref: 'category', required: true }]
});

const AdminCategoryModel = model('admin_category', AdminCategorySchema);
export default AdminCategoryModel;