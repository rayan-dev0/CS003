import { Router } from "express";
import { authenticateSellerMiddleware } from "../../middlewares/auth-seller";
import { createNewProduct, fetchAllProducts, removeProduct, updateProductData } from "../../controllers/inventory/product.controller";

const router = Router();
router.use(authenticateSellerMiddleware);

router.post('/create', createNewProduct);
router.get('/get', fetchAllProducts);
router.put('/update/:productId', updateProductData);
router.delete('/delete/:productId', removeProduct);

export default router;