import { Router } from 'express';
import auth from './auth/auth.router'
import task from './task/task.router'
import quotes from './quotes/list/router';

const router = Router();

router.use('/auth', auth)
router.use('/task', task)
router.get('/get/quotes', quotes)



export default router