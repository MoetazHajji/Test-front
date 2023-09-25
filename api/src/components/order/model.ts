import {IModel} from "../../commons/component/model";
import {Schema} from "mongoose";
import * as connections from '../../commons/connection/connection';

/**
 * @export
 * @interface IOrderModel
 * @extends {Document}
 */
export interface IOrderModel extends IModel {
    reference:string;
    createdAt:Date;
    updatedAt:Date;
    number:number;
    note : string;
    stateOrder:string;
    totalPrice:number;
    products:any[];
    userId:string;
}


/**
 * @swagger
 * components:
 *  schemas:
 *    OrderSchema:
 *      properties:
 *        reference:
 *          type: string
 *        createdAt:
 *          type: boolean
 *        number:
 *          type: string
 *        stateOrder:
 *          type: string
 *    Orders:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/OrderSchema'
 */
/**
 *   @swagger
 *   tags:
 *     name: users
 *     description: API to manage your users.
 */
const OrderSchema: Schema = new Schema({
    reference : {type:String},
    createdAt : {type:Date},
    updatedAt : {type:Date},
    number : {type:Number},
    stateOrder : {type: String , enum:["IN_PROGRESS","CONFIRMED"]},
    products : {type: Array},
    userId: {type: String},
    totalPrice: {type: Number},
    note: {type: String}
})

export default connections.db.model<IOrderModel>('OrderModel',OrderSchema);
