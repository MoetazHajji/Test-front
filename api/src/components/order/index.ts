import {NextFunction, Request, Response} from "express";
import {IProductModel} from "../product/model";
import ProductService from "../product/service";
import {IOrderModel} from "./model";
import HttpError from "../../commons/error";
import OrderService from "./service";

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function create(req:Request, res:Response, next: NextFunction):Promise<void>{
    try {
        const order : IOrderModel = await OrderService.insert(req.body);
        console.log(req.body)
        res.header("Access-Control-Allow-Origin","*").status(201).json(order);
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
export async function update(req:Request, res:Response, next: NextFunction){
    try {
        const order : IOrderModel = await OrderService.update(req.body);
        console.log(req.body)
        res.header("Access-Control-Allow-Origin","*").status(201).json(order);
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
export async function findOne(req:Request, res:Response, next: NextFunction):Promise<void>{
    try {
        const order : IOrderModel = await OrderService.findOne(req.params.id);
        console.log(req.body)
        res.header("Access-Control-Allow-Origin","*").status(201).json(order);
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
        const order: IOrderModel = await OrderService.remove(req.params.id);
        res.header("Access-Control-Allow-Origin","*").status(200).json(order);
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
        const orders: IOrderModel[] = await OrderService.findAll(limit,req.query.page,req.query.id,req.query.userId);
        res.header("Access-Control-Allow-Origin","*").status(200).json(orders);
    }catch (error){
        next(new HttpError(error.message.status , error.message));
    }
}
