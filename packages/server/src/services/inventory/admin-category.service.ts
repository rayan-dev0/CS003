import { z } from "zod";
import AdminCategoryModel from "../../schemas/inventory/admin-category.schema";
import { adminCategoryValidation } from "../../utils/zod";

export const addAdminCategory = async (categoryData: z.infer<typeof adminCategoryValidation>) => {
    try {
        const result = adminCategoryValidation.safeParse(categoryData);
        if(!result.success) return { success: false, error: result.error.format() };

        const existingCategory = await AdminCategoryModel.findOne({ name: categoryData.name });
        if(existingCategory) return { success: false, message: "Admin Category already exists" };

        await AdminCategoryModel.create(result.data);
        return { success: true, message: "Admin Category created successfully" };
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

export const getAllAdminCategories = async () => {
    try {
        const categories = await AdminCategoryModel.find({});
        return { success: true, categories };
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

const updateCategoryValidation = adminCategoryValidation.partial();

export const updateAdminCategory = async (categoryId: string, categoryData: z.infer<typeof updateCategoryValidation>) => {
    try {
        const existingCategory = await AdminCategoryModel.findById(categoryId);
        if(!existingCategory) return { success: false, message: "Admin Category does not exist" };

        const result = updateCategoryValidation.safeParse(categoryData);
        if(!result.success) return { success: false, error: result.error.format() };

        await AdminCategoryModel.findByIdAndUpdate(categoryId, { $set: categoryData }, { new: true });
        return { success: true, message: "Admin Category updated successfully" };
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

export const deleteAdminCategory = async (categoryId: string) => {
    try {
        const existingCategory = await AdminCategoryModel.findById(categoryId);
        if(!existingCategory) return { success: false, message: "Admin Category does not exist" };

        await AdminCategoryModel.findByIdAndDelete(categoryId);
        return { success: true, message: "Admin Category deleted successfully" };
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}