import { Request, Response } from 'express';

import { ICategoryRequest } from '../interfaces/categories';
import { instanceToPlain } from 'class-transformer';

import { createCategoryService, readCategoriesService } from '../services/categories.service';

export const createCategoryController = async (
	request: Request,
	response: Response,
) => {
	const category: ICategoryRequest = request.body;
	const res = await createCategoryService(category);
	return response.status(201).json(instanceToPlain(res));
};

export const readCategoriesController = async (
	request: Request,
	response: Response,
) => {
	const categories = await readCategoriesService();
	return response.status(200).json(instanceToPlain(categories));
};
