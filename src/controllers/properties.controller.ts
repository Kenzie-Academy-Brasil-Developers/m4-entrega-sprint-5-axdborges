import { Request, response, Response } from 'express';

import { IAddressRequest, IPropertyRequest } from '../interfaces/properties';
import { instanceToPlain } from 'class-transformer';

import {
	createPropertyService,
	readPropertiesService,
} from '../services/properties.service';

export const createPropertyController = async (
	request: Request,
	response: Response,
) => {
	const { address, ...property } = request.body;
	const createdProperty = await createPropertyService(property, address);
	return response.status(201).json(createdProperty);
};

export const readPropertiesController = async (
	request: Request,
	response: Response,
) => {
	const properties = await readPropertiesService();
	return response.status(200).json(properties);
};
