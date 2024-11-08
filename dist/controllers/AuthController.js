"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.logoutClient = exports.loginClient = exports.createClient = exports.blacklist = void 0;
const client_1 = require("@prisma/client");
const argon = __importStar(require("argon2"));
const verifyToken_1 = require("../middlewares/verifyToken");
const library_1 = require("@prisma/client/runtime/library");
const node_path_1 = __importDefault(require("node:path"));
const prisma = new client_1.PrismaClient();
const users = new Map();
exports.blacklist = new Map();
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        const hash = yield argon.hash(password);
        const user = yield prisma.client.create({
            data: {
                name,
                hash
            }
        });
        return res.send({ msg: "Client created", status: true });
    }
    catch (error) {
        if (error instanceof library_1.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.send({ msg: "Client with this name already exist" });
            }
        }
        console.log(error);
    }
});
exports.createClient = createClient;
const loginClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { name, password } = req.body;
        const user = yield prisma.client.findUnique({
            where: {
                name
            }
        });
        const pwMatch = yield argon.verify(user.hash, password);
        if (!pwMatch) {
            return res.send({ msg: "Incorrect credentials", status: false });
        }
        const signedUser = yield (0, verifyToken_1.signToken)(JSON.stringify(user));
        if (!users.get(user.id)) {
            users.set(user.id, signedUser);
            exports.blacklist.set(signedUser, false);
        }
        else {
            let prevToken = users.get(user.id);
            users.set(user.id, signedUser);
            exports.blacklist.set(prevToken, true);
            return res.send({ msg: "You've been logged out! Another log in detected for this username." });
        }
        res.cookie("token", signedUser, {
            httpOnly: true
        });
        res.cookie("clientName", user.name);
        res.sendFile(node_path_1.default.join(__dirname, "../../public/static/index.html"), {
            headers: {
                "clientName": user.name
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginClient = loginClient;
const logoutClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.body.id;
    let t = users.get(uid);
    users.delete(uid);
    exports.blacklist.delete(t);
    res.clearCookie("token");
    return res.send({ msg: "Logged out successfully" });
});
exports.logoutClient = logoutClient;
//# sourceMappingURL=AuthController.js.map