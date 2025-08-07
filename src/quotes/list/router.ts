import { Router } from "express";
import { gettoken } from "../../core/gettoken";
import { verifyToken } from '../../core/verifytoken';
import { getquotes } from "./middleware";
const router = Router();

router.use(gettoken, verifyToken, getquotes)
export default router