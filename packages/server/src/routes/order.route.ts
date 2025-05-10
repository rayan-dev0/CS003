import { Router } from "express";
import { createNewOrder, deleteOrder, getOrdersForCustomer, getOrdersForSeller, modifyOrder } from "../controllers/order.controller";
import { authenticateCustomerMiddleware } from "../middlewares/auth-customer";
import { authenticateSellerMiddleware } from "../middlewares/auth-seller";
import { authenticateAdminMiddleware } from "../middlewares/auth-admin";

const router = Router();

router.post('/create', authenticateCustomerMiddleware, createNewOrder);
router.get('/seller-get', authenticateSellerMiddleware, getOrdersForSeller);
router.get('/customer-get', authenticateCustomerMiddleware, getOrdersForCustomer);
router.put('/update/:orderId', authenticateAdminMiddleware, modifyOrder);
router.delete('/delete/:orderId', authenticateAdminMiddleware, deleteOrder);

export default router;