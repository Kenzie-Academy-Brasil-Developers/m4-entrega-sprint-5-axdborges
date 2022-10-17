import AppDataSource from '../data-source';
import { User } from '../entities/users.entities';
import { AppError } from '../errors/AppError';
import 'dotenv/config';

import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
	IUser,
	IUserCreate,
	IUserLogin,
	IUserRequest,
	IUserUpdate,
	IVerify,
} from '../interfaces/users';

export const createUserService = async (
	data: IUserRequest,
): Promise<User | null> => {
	const hashedPassword = await bcrypt.hash(data.password, 10);

	const userRepository = AppDataSource.getRepository(User);

	const alreadyExistis = await userRepository.findOneBy({
		email: data.email,
	});

	if (alreadyExistis) {
		throw new AppError(400, 'User already exists');
	}
	const createUser = userRepository.create({
		name: data.name,
		email: data.email,
		password: hashedPassword,
		isAdm: data.isAdm,
		isActive: true,
	});

	await userRepository.save(createUser);

	const findUserResponse = await userRepository.findOneBy({
		email: data.email,
	});

	return findUserResponse;
};

export const readUserService = async (): Promise<IUser[]> => {
	const userRepository = AppDataSource.getRepository(User);
	const users = await userRepository.find();
	return users;
};

export const updateUserService = async (
	user: any,
	id: string,
	verify: IVerify,
): Promise<User | null> => {
	const userRepository = AppDataSource.getRepository(User);
	const findUser = await userRepository.findOneBy({ id });

	if (!findUser) {
		throw new AppError(404, 'user not found');
	}
	if (user.isAdm !== undefined || null) {
		throw new AppError(401, 'Cannot update isAdm field');
	}
	if (user.id !== undefined || null) {
		throw new AppError(401, 'Cannot update id field');
	}
	if (user.isActive !== undefined || null) {
		throw new AppError(401, 'Cannot update isActive field');
	}
	if (verify.isAdm) {
		if (user.name) {
			await userRepository.update(id, {
				name: user.name,
			});
		}
		if (user.email) {
			await userRepository.update(id, {
				email: user.email,
			});
		}
		if (user.password) {
			const hashedPassword = await bcrypt.hash(user.password, 10);
			await userRepository.update(id, {
				password: hashedPassword,
			});
		}
	} else if (verify.id === id) {
		if (user.name) {
			await userRepository.update(id, {
				name: user.name,
			});
		}
		if (user.email) {
			await userRepository.update(id, {
				email: user.email,
			});
		}
		if (user.password) {
			const hashedPassword = await bcrypt.hash(user.password, 10);
			await userRepository.update(id, {
				password: hashedPassword,
			});
		}
	} else {
		throw new AppError(401, 'Cannot update user');
	}

	const findUserResponse = await userRepository.findOneBy({ id });

	return findUserResponse;
};

export const deleteUserService = async (id: string): Promise<string> => {
	const userRepository = AppDataSource.getRepository(User);
	const findUser = await userRepository.findOneBy({ id });

	if (!findUser) {
		throw new AppError(404, 'user not found');
	}
	if (!findUser.isActive) {
		throw new AppError(400, 'user already inactive');
	} else {
		await userRepository.update(id, { isActive: false });
	}

	return 'user deleted with success';
};

export const loginUserService = async (user: IUserLogin): Promise<string> => {
	if (!user.password) {
		throw new AppError(400, 'Password is required');
	}
	const userRepository = AppDataSource.getRepository(User);
	const findUser = await userRepository.findOneBy({ email: user.email });

	if (findUser) {
		const hashedPassword = bcrypt.compareSync(user.password, findUser.password);
		if (!hashedPassword) {
			throw new AppError(400, 'email ou senha inválidos');
		}
	} else {
		throw new AppError(400, 'email ou senha inválidos');
	}

	const token = jwt.sign(
		{
			isAdm: findUser.isAdm,
		},
		process.env.SECRET_KEY as string,
		{
			expiresIn: '24h',
			subject: findUser.id,
		},
	);

	return token;
};
