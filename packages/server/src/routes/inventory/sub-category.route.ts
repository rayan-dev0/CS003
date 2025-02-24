import { Router } from "express";
import { authenticateSellerMiddleware } from "../../middlewares/auth-seller";
import { createNewSubCategory, fetchAllSubCategories, removeSubCategory, updateSubCategoryData } from "../../controllers/inventory/sub-category.controller";

const router = Router();
router.use(authenticateSellerMiddleware);

router.post('/create', createNewSubCategory);
router.get('/get', fetchAllSubCategories);
router.put('/update/:subCategoryId', updateSubCategoryData);
router.delete('/delete/:subCategoryId', removeSubCategory);

export default router;