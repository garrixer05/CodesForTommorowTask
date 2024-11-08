import { Router } from 'express';
import { createClient, loginClient } from '../controllers/AuthController';
const router = Router();

router.post('/login', loginClient as any);
router.post('/register', createClient as any);

export default router;