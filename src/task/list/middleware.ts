import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../../core/catcherror";
import { TaskUtils } from "../taskUtils";
export const listTask = catchAsyncError(async (_: Request, res: Response, __: NextFunction) => {

    const { userdata: { email, accountid } } = res.locals

    const listdata = await TaskUtils.listTask({ accountid, email })
    if (listdata) {
        res.status(200).json({
            status: 200, data: listdata
        })
    }
    return
})