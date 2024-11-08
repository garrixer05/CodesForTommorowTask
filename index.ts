import express from 'express';
import dotenv from 'dotenv';
import AuthRoutes from './routes/AuthRoutes'
import { Server } from 'socket.io';
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config();


const app = express();

app.use(cors({
    credentials:true
}))
app.use(cookieParser())
app.use(express.json());
app.use(AuthRoutes);
const PORT = process.env.PORT

const server = app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});

const io = new Server(server,{});

io.on('connection', (socket)=>{

})