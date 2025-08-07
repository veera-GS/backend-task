import { Router } from "express";
import { gettoken } from "../../core/gettoken";
import { reqdataValidation } from '../../core/requestdatavalidator'
import { verifyToken } from '../../core/verifytoken'
import { createTask,validation } from "./middleware";
const router = Router();

router.use(reqdataValidation, gettoken, verifyToken,validation, createTask)

export default router