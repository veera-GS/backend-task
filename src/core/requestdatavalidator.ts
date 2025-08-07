import { Request, Response, NextFunction } from "express"
import { catchAsyncError } from "./catcherror"

export const reqdataValidation = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body.data
    console.log('111111', data);

    if (!data) {
        throw new Error('request data notfound')
    }

    res.locals = { ...res.locals, reqdata: data }
    next()
    return
})