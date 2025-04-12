import { Router } from "express";
import { createNewAdminCategory, fetchAllAdminCategories, removeAdminCategory, updateAdminCategoryData } from "../../controllers/inventory/admin-category.controller";
import { authenticateAdminMiddleware } from "../../middlewares/auth-admin";

const router = Router();
router.use(authenticateAdminMiddleware);

router.post('/create', createNewAdminCategory);
router.get('/get', fetchAllAdminCategories);
router.put('/update/:adminCategoryId', updateAdminCategoryData);
router.delete('/delete/:adminCategoryId', removeAdminCategory);

export default router;