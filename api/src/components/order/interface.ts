import {IService} from "../../commons/component/interface";
import {IOrderModel} from "./model";
import {IProductModel} from "../product/model";

/**
 * @export
 * @interface IOrderSerive
 */
export interface IOrderService extends IService<IOrderModel>{

    /**
     * @returns {Promise<IPorductModel>}
     * @memberOf IProductService
     */
    insert(orderModel:IOrderModel):Promise<IOrderModel>;

    /**
     * @returns {Promise<IPorductModel>}
     * @memberOf IProductService
     */
    update(orderModel:IOrderModel):Promise<IOrderModel>;

    /**
     * @param {string} code
     * @returns {Promise<IPorductModel>}
     * @memberOf IProductService
     */
    findOne(code:string):Promise<IOrderModel>;
}

export interface Condition {
    userId?: string
}
