import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "./catcherror";
import jwt from "jsonwebtoken";

export const verifyToken = catchAsyncError((_: Request, res: Response, next: NextFunction) => {

    const token = res.locals.token
    const decoded: any = jwt.verify(token, "prodect_secret_key");
    console.log('Decoded payload:', decoded);
    const { id, email, fullname, accountid } = decoded
    res.locals = {
        ...res.locals, userdata: {
            id, email, fullname, accountid
        }
    }
    next()
    return
})