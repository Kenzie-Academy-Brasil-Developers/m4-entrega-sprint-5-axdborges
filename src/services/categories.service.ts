import AppDataSource from '../data-source';

import { Categories } from '../entities/categories.entities';
import { Properties } from '../entities/properties.entities';
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

export const readPropertiesPerCategoryIdService = async (id: string) => {
	const categoryRepository = AppDataSource.getRepository(Categories);
	const propertyRepository = AppDataSource.getRepository(Properties);

	const category = await categoryRepository.findOne({
		where: {
			id: id,
		},
	});
    
    if(!category){
        throw new AppError(404, 'Category not found')
    }
	const readProperties = await propertyRepository.find({
		where: {
			category,
		},
		
	});
    
	return readProperties;
};
