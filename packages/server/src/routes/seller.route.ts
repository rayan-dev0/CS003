import { Router } from "express";
import { authenticateAdminMiddleware } from "../middlewares/auth-admin";
import { createSellerAccount, deleteSellerAccount, fetchAllSellerAccounts, fetchSellerAccount, updateSellerAccountData } from "../controllers/seller.controller";

const router = Router();

router.use(authenticateAdminMiddleware);
router.post('/create-seller-account', createSellerAccount);
router.get('/get-all-sellers', fetchAllSellerAccounts);
router.get('/get-seller/:emailId', fetchSellerAccount);
router.put('/update-seller/:sellerId', updateSellerAccountData);
router.delete('/delete-seller/:sellerId', deleteSellerAccount);

export default router;