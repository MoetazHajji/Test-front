import {IService} from "../../commons/component/interface";
import {IFileModel} from "./model";

/**
 * @export
 * @interface IFileService
 */
export interface IFileService extends IService<IFileModel> {
    /**
     * @param {string} id
     * @param {boolean} signed
     * @returns {Promise<IModel>}
     * @memberof IService
     */
    findOne(id: string, signed?: any): Promise<any>;

    /**
     * @param {IFileModel} body
     * @param {string} render
     * @returns {Promise<IModel>}
     * @memberof IService
     */
    insert(body: IFileModel, render?: any): Promise<any>;
}

export interface Condition {
    userId?: string,
    productId?: string
}
