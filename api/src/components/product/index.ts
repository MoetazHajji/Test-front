import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../commons/error/index';
import ProductService from './service';
import {IProductModel} from "./model";

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function create(req:Request, res:Response, next: NextFunction):Promise<void>{

    try {
        const product : IProductModel = await ProductService.insert(req.body);
        console.log(req.body)
        res.header("Access-Control-Allow-Origin","*").status(201).json(product);
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
        const products: IProductModel[] = await ProductService.findAll();
        res.header("Access-Control-Allow-Origin","*").status(201).json(products);
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
        const product: IProductModel = await ProductService.remove(req.params.id);
        res.header("Access-Control-Allow-Origin","*").status(200).json(product);
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
        const  product: IProductModel = await ProductService.findOne(req.params.id);
        res.header("Access-Control-Allow-Origin", "*").status(200).json(product);
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
        const product: IProductModel = await ProductService.update(req.body);
        res.header("Access-Control-Allow-Origin", "*").status(200).json(product);
    }catch (error){
        next(new HttpError(error.message.status, error.message));
    }
}


