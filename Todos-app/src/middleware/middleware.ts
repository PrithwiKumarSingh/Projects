
import bcrypt from "bcrypt"
import type { NextFunction, Request, Response } from "express";
import jwt, { decode, type JwtPayload } from "jsonwebtoken";


export function middleware(req:Request, res:Response,next:NextFunction){

    try {
        const headers = req.headers["authorization"];

        if(!headers){
            res.json({
                message : "Token not found!"
            })
            return;
        }

        const decoded = jwt.verify(headers, process.env.JWT_SECRET_KEY!) as JwtPayload;

        if(decoded){
            req.userId = decoded.userId
            next();  
        }

    } catch (err) {
        res.json({
            message : "Token Invalid or Expire"
        })
        
    }
}