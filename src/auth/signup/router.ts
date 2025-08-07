import { Router } from "express";
import { reqdataValidation } from '../../core/requestdatavalidator'
import { validation, checkUserExist, storeUserData } from './middleware'
const router = Router();

router.use(reqdataValidation, validation, checkUserExist, storeUserData)
export default router