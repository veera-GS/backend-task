import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../../core/catcherror";
import { TaskUtils } from "../taskUtils";
import Joi from 'joi';


const Schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
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


export const createTask = catchAsyncError(async (_: Request, res: Response, __: NextFunction) => {

    const { reqdata, userdata: { email, accountid } } = res.locals
    const createtask = await TaskUtils.CreateTask({ accountid, email, data: reqdata })
    if (createtask) {
        res.status(200).json({
            status: 201, data: 'add task successfully'
        })
    }
    return
})