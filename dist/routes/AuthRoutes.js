"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const ServePage_1 = require("../utils/ServePage");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = (0, express_1.Router)();
router.post('/login', AuthController_1.loginClient, ServePage_1.serveHtmlPage);
router.post('/register', AuthController_1.createClient);
router.get("/logout", verifyToken_1.validateToken, AuthController_1.logoutClient);
exports.default = router;
//# sourceMappingURL=AuthRoutes.js.map