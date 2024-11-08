"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(AuthRoutes_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
//# sourceMappingURL=index.js.map