import * as Joi from 'joi';
import Validation from '../../commons/component/validation';
import {IUserModel} from "./model";


/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class UserValidation extends Validation<IUserModel> {

    /**
     * Creates an instance of IUserModel.
     * @memberof UserValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    create(
        params: IUserModel
    ): Joi.ValidationResult<IUserModel> {
        const schema: Joi.Schema = Joi.object().keys({
            firstname:Joi.string(),
            lastname:Joi.string(),
            email:Joi.string(),
            phone_number:Joi.string(),
            role:Joi.any(),
            address:Joi.string(),
            birthdate:Joi.date(),
            email_verified:Joi.boolean(),
            sub:Joi.string(),
            clientId:Joi.string(),
            cognito:Joi.any(),
            username:Joi.string(),
            userPoolId:Joi.string(),
            code:Joi.string(),
            phone_number_verified:Joi.boolean(),
            picture: Joi.any(),
            photo:Joi.any(),
            orders:Joi.any(),
            products:Joi.any()
        });
        return Joi.validate(params, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
    get(
        body: {
            id: string
        }
    ): Joi.ValidationResult<{
        id: string
    }> {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }

    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    update(
        params: IUserModel
    ): Joi.ValidationResult<IUserModel> {
        const schema: Joi.Schema = Joi.object().keys({
            _id:Joi.string(),
            firstname:Joi.string(),
            lastname:Joi.string(),
            email:Joi.string(),
            phone_number:Joi.string(),
            role:Joi.any(),
            address:Joi.string(),
            birthdate:Joi.date(),
            email_verified:Joi.boolean(),
            username:Joi.string(),
            phone_number_verified:Joi.boolean(),
            picture: Joi.any(),
            code:Joi.any(),
            cognito:Joi.any(),
            __v:Joi.any(),
            sub:Joi.any(),
            photo:Joi.any(),
            orders:Joi.any(),
            products:Joi.any()

        });

        return Joi.validate(params, schema);
    }


    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
    remove(
        body: {
            id: string
        }
    ): Joi.ValidationResult<{
        id: string
    }> {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }
}

export default new UserValidation();

