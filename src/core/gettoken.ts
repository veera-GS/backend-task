import { Request, Response, NextFunction } from "express"
import { catchAsyncError } from "./catcherror"

export const gettoken = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    console.log('authHeader', authHeader);

    const token = authHeader && authHeader.split(' ')[1];
    console.log('token', token);

    if (!token) {
        throw new Error('Token Not Found')
    }

    res.locals = { ...res.locals, token }
    next()
    return
})