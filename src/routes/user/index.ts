import { getUser } from '@/controllers/user';
import { withNextBlock } from '@/utils';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', withNextBlock(getUser));

export default userRouter;
