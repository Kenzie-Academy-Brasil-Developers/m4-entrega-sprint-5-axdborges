import { Router } from 'express';

import { createPropertyController, readPropertiesController } from '../controllers/properties.controller';
import { ensureAuthMiddleware } from '../middlewares/ensureAuth.middleware';
import { ensureIsAdmMiddleware } from '../middlewares/ensureIsAdm.middleware';

const propertiesRouter = Router();

propertiesRouter.post('', ensureAuthMiddleware, ensureIsAdmMiddleware,createPropertyController);
propertiesRouter.get('', readPropertiesController) ;

export default propertiesRouter;