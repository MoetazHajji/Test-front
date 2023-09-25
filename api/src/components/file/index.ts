import {NextFunction, Request, Response} from "express";
import {IFileModel} from "./model";
import FileService from "./service";
import HttpError from "../../commons/error";

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function create(req:Request, res:Response, next: NextFunction):Promise<void>{
    try {
        const file : IFileModel = await FileService.insert(req.body);
        res.status(201).json(file);
    }catch (err){
        next(new HttpError(err.message.status , err.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function update(req:Request, res:Response, next: NextFunction):Promise<void>{
    try {
        const file: IFileModel = await FileService.update(req.body);
        res.status(200).json(file);
    }catch (err){
        next(new HttpError(err.message.status , err.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function remove(req:Request, res:Response, next: NextFunction):Promise<void>{
    try {
        const file:IFileModel = await FileService.remove(req.params.id);
        res.status(200).json(file);
    }catch (err){
        next(new HttpError(err.message.status , err.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns { Promise < void > }
 */
export async function findOne(req:Request , res:Response , next:NextFunction): Promise<void> {
    try {
        const file:IFileModel = await FileService.findOne(req.params.id);
        res.status(200).json(file);
    }catch (err){
        next(new HttpError(err.message.status , err.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req:Request , res:Response ,next:NextFunction) : Promise<void> {
    try {
        let limit = undefined ;
        let page = undefined ;
        if (req.query.page != undefined) {limit = parseInt(req.params.page.toString())}
        const files : IFileModel[] =await FileService.findAll(limit , req.query.page, req.query.lastId, req.query.name, req.query.type);
        res.status(200).json(files);
    }catch (err){
        next(new HttpError(err.message.status , err.message));
    }
}
