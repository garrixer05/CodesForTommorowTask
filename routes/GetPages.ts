import { Router } from 'express';
import { serveLoginPage, serveRegisterPage } from '../utils/ServePage';
const router = Router()

router.get('/loginPage', serveLoginPage);
router.get('/registerPage', serveRegisterPage);


export default router;