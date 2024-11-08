import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as argon from 'argon2'
import { signToken } from "../middlewares/verifyToken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

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

export const loginClient = async (req:Request, res:Response)=>{
    try {
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
        res.writeHead(200,{
            "set-cookie":`token=${signedUser}; HttpOnly`,
            "access-control-allow-credentials":"true"
        })
        res.end("Logged in")
        
    } catch (error) {
        console.log(error);
    }
}