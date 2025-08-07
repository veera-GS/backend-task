import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../../core/catcherror";
import { getMongodb } from '../../../mongodb'
import { generateRandomString } from "../../core/randomstring";
import bcrypt from 'bcrypt';

import Joi from 'joi';


const Schema = Joi.object({
    id: Joi.string().required(),
    email: Joi.string().email().required(),
    fullname: Joi.string().required(),
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


export const checkUserExist = catchAsyncError(async (_: Request, res: Response, next: NextFunction) => {
    const { email }: any = res.locals.reqdata
    const mongodb = await getMongodb()


    const check = await mongodb.collection("Login").countDocuments({ email })

    if (check > 0) {
        throw new Error('User Allredy exist')
    }

    next()
    return
})

export const storeUserData = catchAsyncError(async (_: Request, res: Response, __: NextFunction) => {
    const { id, email, fullname, password }: any = res.locals.reqdata
    const mongodb = await getMongodb()
    const accountid = generateRandomString(10)
    const hash = await bcrypt.hash(password, 8);

    try {
        await mongodb.collection("Login").insertOne({ email, accountid, id, createdat: new Date(), fullname, password: hash })

    } catch (error: any) {

        throw new Error(error)
    }

    res.status(201).json({ status: 201, data: 'signup successfully completed' })
    return
})