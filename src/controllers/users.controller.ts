import { Request, Response } from 'express';
import {
    IUser,
	IUserLogin,
	IUserRequest,
	IUserUpdate,
    IVerify,
} from '../interfaces/users';
import { instanceToPlain } from 'class-transformer';

import {
	createUserService,
	readUserService,
	updateUserService,
	deleteUserService,
	loginUserService,
} from '../services/users.service';

export const createUserController = async (
	request: Request,
	response: Response,
) => {

    const user: IUserRequest = request.body;
    const res = await createUserService(user);
    return response.status(201).json(instanceToPlain(res));
};

export const readUserController = async (
	request: Request,
	response: Response,
) => {
	
    const users = await readUserService();
    return response.status(200).json(instanceToPlain(users));
};

export const updateUserController = async (
	request: Request,
	response: Response,
) => {
	
    const verify: IVerify = request.user
    const { id } = request.params;
    const user: IUserUpdate = request.body;
    const res = await updateUserService(user, id, verify);
    return response.status(200).json(instanceToPlain(res));
};

export const deleteUserController = async (
	request: Request,
	response: Response,
) => {

    const { id } = request.params;
    const res = await deleteUserService(id);
    return response.status(204).json(res);
};

export const loginUserController = async (
	request: Request,
	response: Response,
) => {
	
    const login: IUserLogin = request.body;
    const token = await loginUserService(login);
    return response.status(200).json({ token });
};
