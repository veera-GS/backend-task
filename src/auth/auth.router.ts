import { Router } from "express";
import signup from './signup/router'
import signin from './sighin/router'
const router = Router();

router.post('/signup', signup)

router.post('/signin', signin)


export default router