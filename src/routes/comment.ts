import { Router } from 'express';
import { validateToken } from '../libs/validateToken';

import { getAll, bulkInsert } from '../controllers/comment.controller';

const router: Router = Router();

router.get('/', validateToken, getAll);
router.get('/register', validateToken, bulkInsert);

export default router; 
