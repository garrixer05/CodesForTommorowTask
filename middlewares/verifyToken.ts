import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();

const SECRET = process.env.SECRET

export const signToken =async (payload:string)=>{
    const signedUser = jwt.sign(payload,SECRET);
    return signedUser;
}
export const validateToken = async (req:Request, res:Response, next:NextFunction)=>{
    if(req.cookies.token){
        return res.send({msg:"Auth token required", status:401})
    }
    try {
        jwt.verify(req.cookies.token, SECRET)
        next();
    } catch (error) {
        return res.send({msg:"Invalid creds"})
    }
}