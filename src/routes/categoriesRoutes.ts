import { Router } from 'express';

import { ensureIsAdmMiddleware } from '../middlewares/ensureIsAdm.middleware';
import { ensureAuthMiddleware } from '../middlewares/ensureAuth.middleware';

import {
	createCategoryController,
	readCategoriesController,
    readPropertiesPerCategoryIdController,
} from '../controllers/categories.controller';

const categoryRouter = Router();

categoryRouter.post(
	'',
	ensureAuthMiddleware,
	ensureIsAdmMiddleware,
	createCategoryController,
);
categoryRouter.get('', readCategoriesController);
categoryRouter.get('/:id/properties', readPropertiesPerCategoryIdController);

export default categoryRouter;
