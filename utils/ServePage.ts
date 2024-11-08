import { Request, Response, NextFunction } from "express";
import path from 'node:path'


export const serveHtmlPage = async (req: Request, res:Response, next:NextFunction)=>{
    return res.sendFile(path.join(__dirname, "../../public/static/index.html"));
}

export const serveLoginPage = async (req: Request, res:Response, next:NextFunction)=>{
    return res.sendFile(path.join(__dirname, '../../public/static/login.html'));
}
export const serveRegisterPage = async (req: Request, res:Response, next:NextFunction)=>{
    return res.sendFile(path.join(__dirname, '../../public/static/register.html'));
}