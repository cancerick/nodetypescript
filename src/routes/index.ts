import  { Router } from 'express';

import authRoutes from './auth';
import postRoutes from './post';
import commentRoutes from './comment';

const router = Router();

router.use('/auth', authRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

export default router;
