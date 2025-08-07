import { Router } from "express";
import { reqdataValidation } from '../../core/requestdatavalidator'
import { validation, JwtTokenGenerate, checkandGetUser } from './middleware'
const router = Router();

router.use(reqdataValidation, validation, checkandGetUser, JwtTokenGenerate)
export default router