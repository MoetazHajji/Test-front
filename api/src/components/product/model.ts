import { Schema, Document } from "mongoose";
import { IModel } from "../../commons/component/model";
import * as connections from "../../commons/connection/connection";

/**
 * @export
 * @interface IProductModel
 * @extends {Document}
 */

export interface IProductModel extends IModel {
    sousCategory_id:string;
    sousCategory:any;
    reference:string;
    name:string;
    description:string;
    price:number;
    refundable:boolean;
    state:string;
    category:string;
    pictures:any[];
    orders:any[];
    quantity:number;
    userId:string;
}


const ProductSchema: Schema = new Schema({
    sousCategory_id : {type:String},
    sousCategory : {type:JSON},
    name: {type:String},
    reference : {type:String},
    description : {type:String},
    price : {type:Number},
    refundable : {type:Boolean},
    state:{type:String , enum: ['OLD','NEW']},
    category:{type:String , enum: ['OLD','NEW']},
    pictures:{type: Array},
    orders: {type: Array},
    quantity: {type : Number},
    userId: {type: String}

},{
    timestamps: true,
    collection: 'ProductModel',
    versionKey: false
})

export default connections.db.model<IProductModel>('ProductModel',ProductSchema);
