import * as Joi from 'joi';
import { Types } from 'mongoose';
import { IModel } from './model';

/**
 * @export
 * @class Validation
 */
abstract class Validation<T extends IModel> {
    customJoi: any;

    /**
     * @static
     * @type {string}
     * @memberof JoiSchema
     */
    readonly messageObjectId: string =
        'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters';

    /**
     * Creates an instance of Schema.
     * @memberof JoiSchema
     */
    constructor() {
        this.customJoi = Joi.extend({
            name: 'objectId',
            language: {
                base: this.messageObjectId
            },
            pre(
                value: string,
                state: Joi.State,
                options: Joi.ValidationOptions
            ): Object | string {
                if (!Types.ObjectId.isValid(value)) {
                    return this.createError(
                        'objectId.base', {
                            value
                        },
                        state,
                        options
                    );
                }
                return value; // Keep the value as it was
            }
        });
    }


    /**
     * @param {IModel} params
     * @returns {Joi.ValidationResult<IModel >}
     * @memberof Validation
     */
    create(
        params: T
    ): Joi.ValidationResult < T > {
        const schema: Joi.Schema = Joi.object().keys({});

        return Joi.validate(params, schema);
    }
    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof Validation
     */
    get(
        body: {
            id: string
        }
    ): Joi.ValidationResult < {
        id: string
    } > {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }


    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof Validation
     */
    remove(
        body: {
            id: string
        }
    ): Joi.ValidationResult < {
        id: string
    } > {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }
}

export default Validation;
