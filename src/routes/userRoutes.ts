import { Router } from 'express';

import {
	createUserController,
	readUserController,
	updateUserController,
	deleteUserController,
} from '../controllers/users.controller';

import { ensureAuthMiddleware } from '../middlewares/ensureAuth.middleware';
import { ensureIsAdmMiddleware } from '../middlewares/ensureIsAdm.middleware';

const userRouter = Router();

userRouter.post('', createUserController);
userRouter.get(
	'',
	ensureAuthMiddleware,
	ensureIsAdmMiddleware,
	readUserController,
);
userRouter.patch('/:id', ensureAuthMiddleware, updateUserController);
userRouter.delete(
	'/:id',
	ensureAuthMiddleware,
	ensureIsAdmMiddleware,
	deleteUserController,
);

export default userRouter;
