import {IService} from "../../commons/component/interface";
import {IProductModel} from "./model";

/**
 * @export
 * @interface IProductService
 */
export interface IProductService extends IService<IProductModel> {
    /**
     * @returns {Promise<IPorductModel>}
     * @memberOf IProductService
     */
    insert(productModel: IProductModel): Promise<IProductModel>;

    /**
     * @returns {Promise<IProductModel[]>}
     * @memberOf IProductService
     */
    findAll(): Promise<IProductModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IProductModel>}
     * @memberOf IProductService
     */
    findOne(code:string) : Promise<IProductModel>;

    /**
     * @param {string} id
     * @returns {Promise<IProductModel>}
     * @memberOf IProductService
     */
    remove(id : string): Promise<IProductModel>
}
