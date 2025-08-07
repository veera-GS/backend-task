import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../../core/catcherror";
import { getMongodb } from '../../../mongodb'
import bcrypt from 'bcrypt';
import { AuthUtils } from "../authUtils";

import Joi from 'joi';


const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});


export const validation = catchAsyncError(async (_: Request, res: Response, next: NextFunction) => {

    const { reqdata } = res.locals
    const { error } = Schema.validate(reqdata, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            details: error.details.map(err => err.message),
        });
    }
    next();
    return
})

export const checkandGetUser = catchAsyncError(async (_: Request, res: Response, next: NextFunction) => {
    const { email, password }: any = res.locals.reqdata
    const mongodb = await getMongodb()


    const getuserdata: any = await mongodb.collection("Login").findOne({ email })

    const { password: haspassword } = getuserdata

    const isMatch = await bcrypt.compare(password, haspassword);

    if (!isMatch) {
        throw new Error("user password not correct!! try another password ")
    }
    res.locals = { ...res.locals, userdata: getuserdata }
    next()
    return
})


export const JwtTokenGenerate = catchAsyncError(async (_: Request, res: Response, next: NextFunction) => {
    const { email, fullname, id, accountid, isadmin = false }: any = res.locals.userdata
    let token: string
    try {
        token = await AuthUtils.tokengenerate({ accountid, email, fullname, id })

    } catch (error) {
        throw new Error('error on token generate')
    }

    res.status(201).json({
        token, email, fullname, accountid, isadmin
    })
    return
})