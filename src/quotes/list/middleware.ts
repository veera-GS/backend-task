import axios from 'axios';
import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../../core/catcherror";

export const getquotes = catchAsyncError(async (_: Request, res: Response, __: NextFunction) => {


    const BASE_URL = 'http://api.quotable.io/random';

    try {
        const response = await axios.get(`${BASE_URL}`);
        console.log('GET:', response.data);
        if (response.data) {
            res.status(200).json({
                status: 200, data: response.data
            })
        }
    } catch (error: any) {
        console.error('GET Error:', error.message);
        throw new Error('Error fetching quotes');
    }
    return
})