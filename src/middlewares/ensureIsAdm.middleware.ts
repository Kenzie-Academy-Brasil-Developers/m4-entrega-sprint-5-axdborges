import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export const ensureIsAdmMiddleware = async (
	request: Request,
	response: Response,
	next: NextFunction,
) => {

    if(!request.user.isAdm){
        throw new AppError(403, 'User is not admin')
    }

    return next()

}