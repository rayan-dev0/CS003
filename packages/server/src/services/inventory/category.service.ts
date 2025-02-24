import { z } from "zod";
import CategoryModel from "../../schemas/inventory/category.schema";
import { categoryValidation } from "../../utils/zod";

export const addCategory = async (categoryData: z.infer<typeof categoryValidation>) => {
    try {
        const result = categoryValidation.safeParse(categoryData);
        if(!result.success) return { success: false, error: result.error.format() };

        const existingCategory = await CategoryModel.findOne({ name: categoryData.name });
        if(existingCategory) return { success: false, message: "Category already exists" };

        await CategoryModel.create(result.data);
        return { success: true, message: "Category created successfully" };
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

export const getAllCategories = async (sellerId: string) => {
    try {
        const categories = await CategoryModel.find({ seller: sellerId });
        return { success: true, categories };
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

const updateCategoryValidation = categoryValidation.partial();

export const updateCategory = async (categoryId: string, categoryData: z.infer<typeof updateCategoryValidation>) => {
    try {
        const existingCategory = await CategoryModel.findById(categoryId);
        if(!existingCategory) return { success: false, message: "Category does not exist" };

        const result = updateCategoryValidation.safeParse(categoryData);
        if(!result.success) return { success: false, error: result.error.format() };

        await CategoryModel.findByIdAndUpdate(categoryId, { $set: categoryData }, { new: true });
        return { success: true, message: "Category updated successfully" };
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

export const deleteCategory = async (categoryId: string) => {
    try {
        const existingCategory = await CategoryModel.findById(categoryId);
        if(!existingCategory) return { success: false, message: "Category does not exist" };

        await CategoryModel.findByIdAndDelete(categoryId);
        return { success: true, message: "Category deleted successfully" };
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}