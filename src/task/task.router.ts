import { Router } from 'express';
import createtask from './create/router'
import listtask from './list/router'
import updatetask from './update/router'
import deletetask from './delete/router'

const router = Router();

router.post('/create', createtask)
router.get('/list', listtask)
router.post('/update', updatetask)
router.post('/delete', deletetask)

export default router