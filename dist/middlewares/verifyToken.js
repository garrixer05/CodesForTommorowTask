"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const AuthController_1 = require("../controllers/AuthController");
dotenv_1.default.config();
const SECRET = process.env.SECRET;
const signToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const signedUser = jsonwebtoken_1.default.sign(payload, SECRET);
    return signedUser;
});
exports.signToken = signToken;
const validateToken = (req, res, next) => {
    if (!req.cookies.token) {
        return res.send({ msg: "Auth token required", status: 401 });
    }
    if (AuthController_1.blacklist.get(req.cookies.token)) {
        return res.send({ msg: "You've been logged out! Another log in detected for this username." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(req.cookies.token, SECRET);
        req.body = decoded;
        next();
    }
    catch (error) {
        return res.send({ msg: "Invalid creds" });
    }
};
exports.validateToken = validateToken;
//# sourceMappingURL=verifyToken.js.map