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

    // if(data.date.includes('/')){
    //     // throw new AppError(400, 'Invalid Date');
    // }

	if (data.date.length !== 10) {
		throw new AppError(400, 'Invalid Date');
	}

	let splitData = data.date.split('');
	const arrayData: string[] = [];
	splitData.forEach((elem) => {
		if (elem != '/') {
			arrayData.push(elem);
		} else {
			arrayData.push('-');
		}
	});
	const editedData = arrayData.join('');

	const completeDate = new Date(`${data.date}, ${data.hour}`);


	if (!completeDate) {
		throw new AppError(400, 'Invalid date');
	}
    if(completeDate.getDay() == 0 || completeDate.getDay() == 6){
        throw new AppError(400, 'Invalid Date')
    }


	const hours = completeDate.getHours();
    console.log(hours);

	if (!hours) {
		throw new AppError(400, 'Invalid Hour');
	}
	if (hours >= 18) {
		throw new AppError(400, 'Out of comertial time');
	}
    if (hours < 8) {
		throw new AppError(400, 'Out of comertial time');
	}
    

	const scheduleAlreadyCreated = await scheduleRepository.find({
        where: {
            property: {
                id: data.propertyId
            },
            date: editedData,
            hour: data.hour,
        },
        relations: {
            property: true
        }
	});
    
	if (scheduleAlreadyCreated.length == 1) {
		throw new AppError(400, 'Schedule already exists in this property');
	}

	console.log(!!scheduleAlreadyCreated);

	const createSchedule = scheduleRepository.create({
		...data,
		date: editedData,
	});
	await scheduleRepository.save(createSchedule);

	await scheduleRepository.update(createSchedule.id, {
		property: propertyExists,
		user: userExists,
		date: editedData,
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

	const readSchedulesProperties = await schedulesRepository.find({
        where: {
            property: {
                id,
            }
        }
	});

    const response = {
        id: property.id,
        schedules: readSchedulesProperties
        
    }

	return readSchedulesProperties;
};
