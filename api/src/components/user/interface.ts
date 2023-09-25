import {IService} from "../../commons/component/interface";
import {IUserModel} from "./model";

/**
 * @export
 * @interface IUserService
 */
export interface IUserService extends IService<IUserModel> {

    /**
     * @returns {Promise<IModel>}
     * @memberOf IUserService
     */
    insert(body:IUserModel , render?:any): Promise<any>;
}
