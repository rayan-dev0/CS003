import { Router } from "express";
import { authenticateSellerMiddleware } from "../../middlewares/auth-seller";
import { createNewProduct, fetchAllProducts, removeProduct, updateProductData, uploadImgToBlobStorage } from "../../controllers/inventory/product.controller";
import upload from "../../middlewares/upload";

const router = Router();
router.use(authenticateSellerMiddleware);

router.post('/create', createNewProduct);
router.get('/get', fetchAllProducts);
router.put('/update/:productId', updateProductData);
router.delete('/delete/:productId', removeProduct);
router.post('/upload', upload.array('file', 5), uploadImgToBlobStorage);

export default router;