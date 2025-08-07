import { Router } from "express";
import { gettoken } from "../../core/gettoken";
import { verifyToken } from '../../core/verifytoken';
import { listTask } from "./middleware";
const router = Router();

router.use(gettoken, verifyToken, listTask)
export default router