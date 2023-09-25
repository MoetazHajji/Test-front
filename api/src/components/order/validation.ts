import Validation from "../../commons/component/validation";
import {IOrderModel} from "./model";
import * as Joi from "joi";

/**
 * @export
 * @class OrderValidation
 * @extends Validation
 */
class OrderValidation extends Validation<IOrderModel>{

    /**
     * Creates an instance of IOrderModel
     * @memberof OrderValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IOrderModel} params
     * @returns {Joi.ValidationResult<IOrderModel >}
     * @memberof UserValidation
     */
    create(
        params: IOrderModel
    ): Joi.ValidationResult<IOrderModel> {
        const schema: Joi.Schema = Joi.object().keys({
            reference : Joi.string().required(),
            createdAt : Joi.date(),
            number : Joi.number().required(),
            stateOrder : Joi.string().required(),
            totalPrice : Joi.number().required(),
            products : Joi.any(),
            userId : Joi.string(),
            note : Joi.string()
        });
        return Joi.validate(params,schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof OrderValidation
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
     * @param {IOrderModel} params
     * @returns {Joi.ValidationResult<IOrderModel >}
     * @memberof OrderValidation
     */
    update(
        params: IOrderModel
    ): Joi.ValidationResult<IOrderModel> {
        const schema: Joi.Schema = Joi.object().keys({
            _id: Joi.string().required(),
            totalPrice : Joi.number().required(),
            reference : Joi.string(),
            updatedAt : Joi.date(),
            number : Joi.number(),
            stateOrder : Joi.string(),
            products : Joi.any(),
            userId: Joi.string(),
            note : Joi.string()
        });

        return Joi.validate(params, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof OrderValidation
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

export default new OrderValidation();
