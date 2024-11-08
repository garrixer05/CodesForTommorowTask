"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlineUsers = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const GetPages_1 = __importDefault(require("./routes/GetPages"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(AuthRoutes_1.default);
app.use(GetPages_1.default);
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
const io = new socket_io_1.Server(server, {});
exports.onlineUsers = new Map();
io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (clientName) => {
        exports.onlineUsers.set(clientName, socket.id);
        socket.emit("online-users", Array.from(exports.onlineUsers.keys()));
    });
    socket.on("chat-message", (data) => {
        if (data.to === "all") {
            socket.broadcast.emit("chat-message", {
                from: data.from,
                msg: data.msg
            });
        }
        else {
            const sendUserSocket = exports.onlineUsers.get(data.to);
            if (sendUserSocket) {
                socket.to(sendUserSocket).emit('msg-recieve', {
                    from: data.from,
                    msg: data.msg
                });
            }
        }
    });
});
//# sourceMappingURL=index.js.map