"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ServePage_1 = require("../utils/ServePage");
const router = (0, express_1.Router)();
router.get('/loginPage', ServePage_1.serveLoginPage);
router.get('/registerPage', ServePage_1.serveRegisterPage);
exports.default = router;
//# sourceMappingURL=GetPages.js.map