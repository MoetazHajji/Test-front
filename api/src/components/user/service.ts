import * as Joi from 'joi';
import {Types} from 'mongoose';
import {IUserService} from "./interface";
import UserModel, {IUserModel} from "./model";
import UserValidation from "./validation";

/**
 * @export
 * @implements {IUserService}
 */

const UserService: IUserService = {
    /**
     * @returns {Promise<IUserModel>}
     * @memberOf UserService
     */
    async findAll(limit: number, page:number, email:string,cognito: any): Promise<any> {
        var sort = {createdAt: -1} ;
        if (limit > 50) {
            throw new Error('invalid limit');
        }else if (limit < 0 || limit === 0) {
            throw new Error('invalid limit number, should start with 1');
        }
        else {
            if (email != undefined){
                try {
                    return await UserModel.find({email : email});
                }catch (error) {
                    throw new Error(error.message);
                }
            } else if (cognito != null){
                try {
                    return await UserModel.findOne({cognito : cognito});
                }catch (err) {
                    throw new Error(err.message);
                }
            }
            else {
                try {
                    return UserModel.find().sort(sort).limit(limit).skip((page -1) * limit);
                }catch (err){
                    throw new Error(err.message);
                }
            }
        }
    },

    /**
     * @returns {Promise<IUserModel>}
     * @param {string} id
     * @memberOf UserService
     */
    async findOne(id: string): Promise<IUserModel> {
        try {
            const validate : Joi.ValidationResult<{
                id:string
            }> = UserValidation.get({
                id
            });
            if (validate.error){
                throw new Error(validate.error.message);
            }
            return await UserModel.findOne({
                _id: Types.ObjectId(id)
            });
        }catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @returns {Promise<IUserModel>}
     * @param userModel
     * @memberOf UserService
     */
    async insert(body: IUserModel): Promise<IUserModel> {
        try {
            let user:IUserModel = await UserModel.findOne({$or: [{username : body.username} , {email : body.email}]});
            if (user == null){
                console.log('no user found ');
                const validate: Joi.ValidationResult<IUserModel> = UserValidation.create(body);
                if (validate.error){
                    throw new Error(validate.error.message);
                }
                user = await UserModel.create(body);
                console.log('User : ' , user)
            }else {
                body._id = user._id.toString();
                const validate: Joi.ValidationResult<IUserModel> = UserValidation.update(body);
                if (validate.error){
                    throw new Error(validate.error.message);
                }
                user = await UserModel.findByIdAndUpdate(body._id,body);
            }
            //const user:IUserModel = await UserModel.create(body)
            return user;
        }catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @returns {Promise<IUserModel>}
     * @param id
     * @memberOf UserService
     */
    async remove(id: string): Promise<IUserModel> {
        try {
            const validate: Joi.ValidationResult<{
                id:string
            }> = UserValidation.remove({
                id
            });
            if (validate.error){
                throw new Error(validate.error.message);
            }
            const user:IUserModel = await UserModel.findByIdAndRemove({
                _id:Types.ObjectId(id)
            });
            return user;
        }catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IUserModel}
     * @returns {Promise<IUserModel>}
     * @memberOf UserService
     */
    async update(userModel: IUserModel): Promise<IUserModel> {
        try {
            const validate:Joi.ValidationResult<IUserModel> = UserValidation.update(userModel);
            if (validate.error){
                throw new Error(validate.error.message);
            }
            const user:IUserModel = await UserModel.findByIdAndUpdate(userModel._id,userModel);
            return user;
        }catch (error) {
            throw new Error(error.message);
        }
    }
}

export default UserService;
