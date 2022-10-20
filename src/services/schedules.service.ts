import AppDataSource from '../data-source';

import { User } from '../entities/users.entities';
import { Properties } from '../entities/properties.entities';
import { SchedulesUsersProperties } from '../entities/schedulesUsersProperties.entities';

import { IScheduleRequest } from '../interfaces/schedules';

import { AppError } from '../errors/AppError';
import 'dotenv/config';

export const createSchedulesService = async (data: IScheduleRequest) => {
	const scheduleRepository = AppDataSource.getRepository(
		SchedulesUsersProperties,
	);
	const usersRepository = AppDataSource.getRepository(User);
	const propertyRepository = AppDataSource.getRepository(Properties);

	const userExists = await usersRepository.findOneBy({
		id: data.userId,
	});
	if (!userExists) {
		throw new AppError(404, 'user not found');
	}

	const propertyExists = await propertyRepository.findOneBy({
		id: data.propertyId,
	});
	if (!propertyExists) {
		throw new AppError(404, 'Property not found');
	}

	if (data.date.length !== 10) {
		throw new AppError(400, 'Invalid Date');
	}

	const completeDate = new Date(`${data.date}, ${data.hour}`);
    if(!completeDate){
        throw new AppError(400, 'Invalid date')
    }

	const hours = completeDate.getHours();

	if (!hours) {
		throw new AppError(400, 'Invalid Hour');
	}
	if (hours > 18 && hours < 8) {
		throw new AppError(400, 'Out of comertial time');
	}

	const scheduleAlreadyCreated = await scheduleRepository.findBy({
		date: data.date,
		hour: data.hour,
		property: propertyExists,
	});
	// if (scheduleAlreadyCreated) {
	// 	throw new AppError(400, 'Schedule already exists in this property');
	// }

	console.log(!!scheduleAlreadyCreated);
	const createSchedule = scheduleRepository.create({
		...data,
	});
	await scheduleRepository.save(createSchedule);

	await scheduleRepository.update(createSchedule.id, {
		property: propertyExists,
		user: userExists,
	});

	const scheduleCreated = await scheduleRepository.findOneBy({
		id: createSchedule.id,
	});

	return 'schedule created';
};

export const readPropertySchedulesService = async (id: string) => {
	const schedulesRepository = AppDataSource.getRepository(
		SchedulesUsersProperties,
	);
	const propertyRepository = AppDataSource.getRepository(Properties);

	const property = await propertyRepository.findOne({
		where: {
			id: id,
		},
	});
	if (!property) {
		throw new AppError(404, 'property not found');
	}

	const readSchedulesProperties = await schedulesRepository.findBy({
		property,
	});

	return readSchedulesProperties;
};
