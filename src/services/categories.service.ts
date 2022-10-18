import AppDataSource from '../data-source';

import { Categories } from '../entities/categories.entities';
import { ICategoryRequest } from '../interfaces/categories';

import { AppError } from '../errors/AppError';
import 'dotenv/config';

export const createCategoryService = async (body: ICategoryRequest) => {
	const categoryRepository = AppDataSource.getRepository(Categories);

	const alreadyExistis = await categoryRepository.findOneBy({
		name: body.name,
	});

	if (alreadyExistis) {
		throw new AppError(400, 'Category already exists');
	}

	await categoryRepository.save(body);

	const categoryCreated = await categoryRepository.findOneBy({
		name: body.name,
	});

	return categoryCreated;
};

export const readCategoriesService = async () => {
	const categoriesRepository = AppDataSource.getRepository(Categories);
	const categories = await categoriesRepository.find();
	return categories;
};
