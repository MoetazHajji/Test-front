import {IModel} from './model';

/**
 * @export
 * @interface IService
 */

export interface IService<T extends IModel> {

    /**
     * @returns {Promise<any>}
     * @memberof IService
     * @param args
     */
    findAll(...args:any): Promise<T[]>;

    /**
     * @returns {Promise<IModel>}
     * @memberof IService
     * @param {string} id 
     * @param {any} args
     */
    findOne(id:string,...args:any): Promise<any>;

    /**
     * @param {IModel} IModel
     * @param {any} file 
     * @param {any} user 
     * @returns {Promise<IModel>}
     * @memberof IService
     */
    insert(T: T, file? : any , user? : any,token?:any): Promise<T>;

    /**
     * @returns {Promise<IModel>}
     * @memberof IService
     */
    update(T:T): Promise<T>;

    /**
     * @param {string} id
     * @returns {Promise<IModel>}
     * @memberof IService
     */
    remove(id:string): Promise<T>;
}
