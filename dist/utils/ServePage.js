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
exports.serveRegisterPage = exports.serveLoginPage = exports.serveHtmlPage = void 0;
const node_path_1 = __importDefault(require("node:path"));
const serveHtmlPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.sendFile(node_path_1.default.join(__dirname, "../../public/static/index.html"));
});
exports.serveHtmlPage = serveHtmlPage;
const serveLoginPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.sendFile(node_path_1.default.join(__dirname, '../../public/static/login.html'));
});
exports.serveLoginPage = serveLoginPage;
const serveRegisterPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.sendFile(node_path_1.default.join(__dirname, '../../public/static/register.html'));
});
exports.serveRegisterPage = serveRegisterPage;
//# sourceMappingURL=ServePage.js.map