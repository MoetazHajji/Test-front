import * as connections from '../../commons/connection/connection';
import {Schema} from 'mongoose';
import {IModel} from '../../commons/component/model';
import {string} from "joi";

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends IModel {
    firstname:string;
    lastname:string;
    email:string;
    phone_number:string;
    birthdate:Date;
    role:any[];
    address:string;
    email_verified:boolean;
    sub:string;
    clientId:string;
    cognito:any;
    username:string;
    code:string;
    phone_number_verified:boolean;
    picture:string;
    photo:string,
    products:string[],
    orders:string[]
}

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - email
 *        - userName
 *      properties:
 *        firstname:
 *          type: string
 *        lastName:
 *          type: boolean
 *        phone_number:
 *          type: string
 *        clientId:
 *          type: string
 *        cognito:
 *          type: string
 *        roles:
 *          type: object
 *        email_verified:
 *          type: boolean
 *        username:
 *          type: string
 *        sub:
 *          type: string
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
/**
 *   @swagger
 *   tags:
 *     name: users
 *     description: API to manage your users.
 */

const UserSchema: Schema = new Schema({
    firstname: {type:String},
    lastname: {type:String},
    email: {type:String, unique:true, required:true},
    phone_number: {type:String},
    role: {type:JSON, enum:['SUPERADMIN','ADMIN','BUYER','SELLER']},
    address: {type:String},
    birthdate: {type:Date},
    email_verified: {type:Boolean},
    sub: {type:String},
    clientId: {type:String},
    cognito: {type:JSON},
    username: {type:String, unique:true, required:true},
    code: {type:String,unique:true},
    phone_number_verified:{type:Boolean},
    picture: { type: String },
    photo: { type: String },
    products : {type: Array},
    orders : {type: Array}
})

export default connections.db.model<IUserModel>('UserModel',UserSchema);
