import { Router } from "express";
import { gettoken } from "../../core/gettoken";
import { reqdataValidation } from '../../core/requestdatavalidator';
import { verifyToken } from '../../core/verifytoken';
import { deleteProductcurt } from "./middleware";
const router = Router();

router.use(reqdataValidation, gettoken, verifyToken, deleteProductcurt)

export default router