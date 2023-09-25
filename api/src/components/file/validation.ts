import Validation from '../../commons/component/validation';
import {IFileModel} from './model';
import * as Joi from 'joi';

/**
 * @export
 * @class FileValidation
 * @extends Validation
 */
class FileValidation extends Validation<IFileModel> {
    /**
     * Creates an instance of IFileModel.
     * @memberof FileValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IFileModel} params
     * @returns {Joi.ValidationResult<IFileModel >}
     * @memberof FileValidation
     */
    create(
        params: IFileModel
    ): Joi.ValidationResult<IFileModel> {
        const schema: Joi.Schema = Joi.object().keys({
            type: Joi.string(),
            name: Joi.string().required(),
            hash: Joi.string().required(),
            path: Joi.string().required(),
            userId: Joi.string(),
            productId:Joi.string()
        });
        return Joi.validate(params, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof FileValidation
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
     * @param {IFileModel} params
     * @returns {Joi.ValidationResult<IFileModel >}
     * @memberof FileValidation
     */
    update(
        params: IFileModel
    ): Joi.ValidationResult<IFileModel> {
        const schema: Joi.Schema = Joi.object().keys({
            _id: Joi.string().required(),
            type: Joi.string(),
            name: Joi.string(),
            hash: Joi.string().required(),
            path: Joi.string().required(),
            userId: Joi.string(),
            productId: Joi.string(),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
        return Joi.validate(params, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof FileValidation
     */
    remove(
        body: {
            id: string
        }
    ): Joi.ValidationResult<{
        id: string
    }> {
        const schemaRemove: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schemaRemove);
    }

}

export default new FileValidation();
