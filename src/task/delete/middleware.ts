import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../../core/catcherror";
import { TaskUtils } from "../taskUtils";
import Joi from 'joi';


const Schema = Joi.object({
    id: Joi.string().required(),
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


export const deleteProductcurt = catchAsyncError(async (_: Request, res: Response, next: NextFunction) => {

    const { reqdata: { id }, userdata: { email, accountid } } = res.locals

    await TaskUtils.deleteTask({ accountid, email, id })
    res.status(200).json({
        status: 201, data: 'deleted task succesfully'
    })
    return
})
