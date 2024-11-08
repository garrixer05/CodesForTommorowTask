import express from 'express';
import dotenv from 'dotenv';
import AuthRoutes from './routes/AuthRoutes'
import { Server } from 'socket.io';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import GetPagesRoutes from './routes/GetPages'
import { validateToken } from './middlewares/verifyToken';
dotenv.config();


const app = express();

app.use(cors({
    credentials:true
}))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(AuthRoutes);
app.use(GetPagesRoutes);

const PORT = process.env.PORT

const server = app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});

const io = new Server(server,{});

export const onlineUsers = new Map();
io.on('connection', (socket)=>{
    global.chatSocket = socket;
    socket.on("add-user", (clientName)=>{
        onlineUsers.set(clientName, socket.id);
        
        socket.emit("online-users", 
            Array.from(onlineUsers.keys())
        )
    });
    socket.on("chat-message", (data)=>{
        if(data.to === "all"){
            socket.broadcast.emit("chat-message", {
                from:data.from,
                msg:data.msg
            })
        }else{
            const sendUserSocket = onlineUsers.get(data.to);
            if(sendUserSocket){
                socket.to(sendUserSocket).emit('msg-recieve', {
                    from:data.from,
                    msg:data.msg
                })
            }
        }
    })
})