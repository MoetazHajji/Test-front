import * as Joi from 'joi';
import Validation from '../../commons/component/validation';
import {IProductModel} from "./model";


/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class ProductValidation extends Validation<IProductModel> {

    /**
     * Creates an instance of IProductModel.
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
        params: IProductModel
    ): Joi.ValidationResult<IProductModel> {
        const schema: Joi.Schema = Joi.object().keys({
            sousCategory_id: Joi.string().allow(null),
            sousCategory:Joi.any().allow(null),
            reference:Joi.string().required(),
            name:Joi.string().required(),
            description:Joi.string().required(),
            price:Joi.number().required(),
            refundable:Joi.boolean(),
            category:Joi.any().required(),
            state:Joi.any().required(),
            pictures:Joi.any(),
            orders:Joi.any(),
            quantity: Joi.number().required(),
            userId: Joi.string().required()
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
        params: IProductModel
    ): Joi.ValidationResult<IProductModel> {
        const schema: Joi.Schema = Joi.object().keys({
            _id: Joi.string().required(),
            sousCategory_id: Joi.string().allow(null),
            sousCategory:Joi.any().allow(null),
            reference:Joi.string().required(),
            name:Joi.string().required(),
            description:Joi.string().required(),
            price:Joi.number().required(),
            refundable:Joi.boolean(),
            pictures:Joi.any(),
            state:Joi.any(),
            category:Joi.any(),
            createdAt:Joi.any(),
            updatedAt:Joi.any(),
            orders:Joi.any(),
            quantity: Joi.number(),
            userId: Joi.string()
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

export default new ProductValidation();

