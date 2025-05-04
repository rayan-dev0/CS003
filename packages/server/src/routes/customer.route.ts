import { Router } from "express";
import { authenticateAdminMiddleware } from "../middlewares/auth-admin";
import { createCustomerAccount, deleteCustomerAccount, fetchAllCustomerAccounts, fetchCustomerAccount, updateCustomerAccountData } from "../controllers/customer.controller";

const router = Router();

router.use(authenticateAdminMiddleware);
router.post('/create', createCustomerAccount);
router.get('/get-all', fetchAllCustomerAccounts);
router.get('/get/:customerId', fetchCustomerAccount);
router.put('/update/:customerId', updateCustomerAccountData);
router.delete('/delete/:customerId', deleteCustomerAccount);

export default router;