import { Router } from 'express';
import { createClient, loginClient, logoutClient } from '../controllers/AuthController';
import { serveHtmlPage } from '../utils/ServePage';
import { validateToken } from '../middlewares/verifyToken';
const router = Router();

router.post('/login', loginClient as any, serveHtmlPage);
router.post('/register', createClient as any);
router.get("/logout", validateToken as any ,logoutClient as any)
export default router;