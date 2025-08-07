import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../../core/catcherror";
import { TaskUtils } from "../taskUtils";

import Joi from 'joi';


const Schema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().min(3).optional(),
    description: Joi.string().optional(),
    status: Joi.string().optional(),
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


export const checkTask = catchAsyncError(async (_: Request, res: Response,next: NextFunction) => {

    const { reqdata, userdata: { email, accountid } } = res.locals

    await TaskUtils.checkTask({ accountid, email, id: reqdata.id })
    next()
    return
})


export const updateProductcurt = catchAsyncError(async (_: Request, res: Response, __: NextFunction) => {

    const { reqdata, userdata: { email, accountid } } = res.locals
 
        await TaskUtils.updateTask({ accountid, email, data: reqdata })
        res.status(200).json({
            status: 201, data: 'update task succesfully'
        })

    return
})
