import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import * as argon from 'argon2'
import { signToken } from "../middlewares/verifyToken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import path from 'node:path'
const prisma = new PrismaClient();

const users = new Map();
export const blacklist = new Map();

export const createClient = async (req:Request, res:Response)=>{
    try {
        const {name, password} = req.body;
        const hash = await argon.hash(password);
    
        const user = await prisma.client.create({
            data:{
                name,
                hash
            }
        })
        return res.send({msg:"Client created", status:true});
        
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError){
            if (error.code === 'P2002'){
                return res.send({msg:"Client with this name already exist"})
            }
        }
        console.log(error);
    }
}

export const loginClient = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        console.log(req.body)
        const {name, password} = req.body;
    
        const user = await prisma.client.findUnique({
            where:{
                name
            }
        });
        const pwMatch = await argon.verify(user.hash, password);
        if(!pwMatch){
            return res.send({msg:"Incorrect credentials", status:false});
        }
        const signedUser = await signToken(JSON.stringify(user));
        if(!users.get(user.id)){
            users.set(user.id, signedUser);
            blacklist.set(signedUser, false);
        }else{
            let prevToken = users.get(user.id)
            users.set(user.id, signedUser);
            blacklist.set(prevToken,true);
        }
        res.cookie("token", signedUser, {
            httpOnly:true
        })
        res.cookie("clientName", user.name);
        res.sendFile(path.join(__dirname, "../../public/static/index.html"), {
            headers:{
                "clientName":user.name
            }
        });
        
    } catch (error) {
        console.log(error);
    }
}

export const logoutClient = async (req:Request,res:Response)=>{
    const uid = req.body.id
    let t = users.get(uid)
    users.delete(uid)
    blacklist.delete(t)
    res.clearCookie("token");
    return res.send({msg:"Logged out successfully"})
}