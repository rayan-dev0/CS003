import { z } from "zod";
import { subCategoryValidation } from "../../utils/zod";
import SubCategoryModel from "../../schemas/inventory/sub-category.schema";

export const addSubCategory = async (subCategoryData: z.infer<typeof subCategoryValidation>) => {
    try {
        const result = subCategoryValidation.safeParse(subCategoryData);
        if(!result.success) return { success: false, error: result.error.format() };

        const existingSubCategory = await SubCategoryModel.findOne({ name: subCategoryData.name });
        if(existingSubCategory) return { success: false, message: "Sub Category already exists" };

        await SubCategoryModel.create(result.data);
        return { success: true, message: "Sub Category created successfully" };
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

export const getAllSubCategories = async (sellerId: string) => {
    try {
        const subCategories = await SubCategoryModel.find({ seller: sellerId });
        return { success: true, subCategories };
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

const updateSubCategoryValidation = subCategoryValidation.partial();

export const updateSubCategory = async (subCategoryId: string, subCategoryData: z.infer<typeof updateSubCategoryValidation>) => {
    try {
        const subExistingCategory = await SubCategoryModel.findById(subCategoryId);
        if(!subExistingCategory) return { success: false, message: "Sub Category does not exist" };

        const result = updateSubCategoryValidation.safeParse(subCategoryData);
        if(!result.success) return { success: false, error: result.error.format() };

        await SubCategoryModel.findByIdAndUpdate(subCategoryId, { $set: subCategoryData }, { new: true });
        return { success: true, message: "Sub Category updated successfully" };
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}

export const deleteSubCategory = async (subCategoryId: string) => {
    try {
        const subExistingCategory = await SubCategoryModel.findById(subCategoryId);
        if(!subExistingCategory) return { success: false, message: "Sub Category does not exist" };

        await SubCategoryModel.findByIdAndDelete(subCategoryId);
        return { success: true, message: "Sub Category deleted successfully" };
    } catch (error) {
        return {
            success: false,
            error: "Internal server error"
        }
    }
}