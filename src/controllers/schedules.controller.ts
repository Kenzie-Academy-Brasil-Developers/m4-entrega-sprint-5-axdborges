import { Request, Response } from 'express';

import { IScheduleRequest } from '../interfaces/schedules';
import { instanceToPlain } from 'class-transformer';

import {
	createSchedulesService,
	readPropertySchedulesService,
} from '../services/schedules.service';

export const createSchedulesController = async (
	request: Request,
	response: Response,
) => {
	const schedule: IScheduleRequest = request.body;
	const newSchedule = await createSchedulesService(schedule);
	return response.json({message: newSchedule});
};

export const readPropertySchedulesController = async (
	request: Request,
	response: Response,
) => {
	const { id } = request.params;
	const schedules = await readPropertySchedulesService(id);
	return response.json(schedules);
};
