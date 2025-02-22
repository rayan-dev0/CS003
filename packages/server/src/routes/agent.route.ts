import { Router } from "express";
import { authenticateAdminMiddleware } from "../middlewares/auth-admin";
import { createDeliveryAgentAccount, deleteDeliveryAgentAccount, fetchAllDeliveryAgentAccounts, fetchDeliveryAgentAccount, updateDeliveryAgentAccountData } from "../controllers/agent.controller";

const router = Router();

router.use(authenticateAdminMiddleware);
router.post('/create-agent-account', createDeliveryAgentAccount);
router.get('/get-all-agents', fetchAllDeliveryAgentAccounts);
router.get('/get-agent/:agentId', fetchDeliveryAgentAccount);
router.put('/update-agent/:agentId', updateDeliveryAgentAccountData);
router.delete('/delete-agent/:agentId', deleteDeliveryAgentAccount);

export default router;