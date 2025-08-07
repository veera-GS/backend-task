import { Router } from "express";
import { gettoken } from "../../core/gettoken";
import { reqdataValidation } from '../../core/requestdatavalidator';
import { verifyToken } from '../../core/verifytoken';
import { checkTask, updateProductcurt,validation } from "./middleware";
const router = Router();

router.use(reqdataValidation, gettoken, verifyToken, validation, checkTask, updateProductcurt)

export default router