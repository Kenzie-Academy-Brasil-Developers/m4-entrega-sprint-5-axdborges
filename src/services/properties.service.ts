import AppDataSource from '../data-source';

import { Categories } from '../entities/categories.entities';
import { Addresses } from '../entities/addresses.entities';
import { Properties } from '../entities/properties.entities';
import { SchedulesUsersProperties } from '../entities/schedulesUsersProperties.entities';
import { IAddressRequest, IPropertyRequest } from '../interfaces/properties';

import { AppError } from '../errors/AppError';
import 'dotenv/config';

export const createPropertyService = async (
	property: IPropertyRequest,
	address: IAddressRequest,
) => {
	const propertyRepository = AppDataSource.getRepository(Properties);
	const addressesRepository = AppDataSource.getRepository(Addresses);
	const categoryRepository = AppDataSource.getRepository(Categories);

	if (address.zipCode.length > 8) {
		throw new AppError(400, 'Invalid zipCode');
	}
	if (address.state.length > 2) {
		throw new AppError(400, 'Invalid state');
	}

	const addressAlreadyExists = await addressesRepository.findOneBy({
		zipCode: address.zipCode,
	});
	if (addressAlreadyExists) {
		throw new AppError(401, 'This address is already registered');
	}

	const IsCategoryExists = await categoryRepository.findOneBy({
		id: property.categoryId,
	});
	if (!IsCategoryExists) {
		throw new AppError(404, 'This property category does not exists');
	}

	const createAddress = addressesRepository.create({
		district: address.district,
		zipCode: address.zipCode,
		number: address.number,
		city: address.city,
		state: address.state,
	});
	await addressesRepository.save(createAddress);

	const createProperty = propertyRepository.create({
		...property,
	});
	await propertyRepository.save(createProperty);

	await propertyRepository.update(createProperty.id, {
		address: createAddress,
	});
	await propertyRepository.update(createProperty.id, {
		category: IsCategoryExists,
	});

	const propertyCreated = await propertyRepository.findOneBy({
		id: createProperty.id,
	});

	return { ...propertyCreated, categoryId: property.categoryId };
};

export const readPropertiesService = async () => {
	const propertiesRepository = AppDataSource.getRepository(Properties);
	const properties = await propertiesRepository.find();
	return properties;
};
