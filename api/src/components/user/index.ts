import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../commons/error/index';
import UserService from './service';
import {IUserModel} from "./model";

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function create(req:Request, res:Response, next: NextFunction):Promise<void>{
    try {
        const user : IUserModel = await UserService.insert(req.body);
        console.log(req.body)
        res.header("Access-Control-Allow-Origin","*").status(201).json(user);
    }catch (error){
        next(new HttpError(error.message.status , error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function findAll(req:Request, res:Response, next:NextFunction):Promise<void>{
    try {
        let limit = undefined;
        if (req.query.limit != undefined){
            limit = parseInt(req.query.limit.toString());
        }
        const users: IUserModel[] = await UserService.findAll(limit,req.query.page,req.query.email);
        res.header("Access-Control-Allow-Origin","*").status(201).json(users);
    }catch (error){
        next(new HttpError(error.message.status , error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function remove(req:Request, res:Response, next:NextFunction):Promise<void>{
    try {
        const user: IUserModel = await UserService.remove(req.params.id);
        res.header("Access-Control-Allow-Origin","*").status(200).json(user);
    }catch (error){
        next(new HttpError(error.message.status , error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function findOne(req:Request, res:Response, next:NextFunction):Promise<void>{
    try {
        const  user: IUserModel = await UserService.findOne(req.params.id);
        res.header("Access-Control-Allow-Origin", "*").status(200).json(user);
    }catch (error){
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function update(req:Request, res:Response, next:NextFunction):Promise<void>{
    try {
        const user: IUserModel = await UserService.update(req.body);
        res.header("Access-Control-Allow-Origin", "*").status(200).json(user);
    }catch (error){
        next(new HttpError(error.message.status, error.message));
    }
}


