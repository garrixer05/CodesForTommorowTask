import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { blacklist } from '../controllers/AuthController';
dotenv.config();

const SECRET = process.env.SECRET

export const signToken =async (payload:string)=>{
    const signedUser = jwt.sign(payload,SECRET);
    return signedUser;
}
export const validateToken = (req:Request, res:Response, next:NextFunction)=>{
    if(!req.cookies.token){
        return res.send({msg:"Auth token required", status:401})
    }
    if(blacklist.get(req.cookies.token)){
        return res.send({msg:"You've been logged out! Another log in detected for this username."})
    }
    try {
        const decoded = jwt.verify(req.cookies.token, SECRET);
        req.body = decoded
        next();
    } catch (error) {
        return res.send({msg:"Invalid creds"})
    }
}