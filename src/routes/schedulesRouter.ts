import { Router } from 'express';

import { createSchedulesController, readPropertySchedulesController } from '../controllers/schedules.controller';
import { ensureAuthMiddleware } from '../middlewares/ensureAuth.middleware';
import { ensureIsAdmMiddleware } from '../middlewares/ensureIsAdm.middleware';

const schedulesRouter = Router();

schedulesRouter.post('', ensureAuthMiddleware,createSchedulesController);
schedulesRouter.get('/properties/:id', ensureAuthMiddleware, ensureIsAdmMiddleware,readPropertySchedulesController);

export default schedulesRouter;