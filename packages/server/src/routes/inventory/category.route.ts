import { Router } from "express";
import { authenticateSellerMiddleware } from "../../middlewares/auth-seller";
import { createNewCategory, fetchAllCategories, removeCategory, updateCategoryData } from "../../controllers/inventory/category.controller";

const router = Router();
router.use(authenticateSellerMiddleware);

router.post('/create', createNewCategory);
router.get('/get', fetchAllCategories);
router.put('/update/:categoryId', updateCategoryData);
router.delete('/delete/:categoryId', removeCategory);

export default router;