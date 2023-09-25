import { IProductService } from "./interface";
import * as Joi from 'joi';
import { Types } from 'mongoose';
import ProductModel , {IProductModel} from "./model";
import ProductValidation from "./validation";

/**
 * @export
 * @implements {IProductService}
 */
const ProductService: IProductService = {
    /**
     * @returns {Promise<IProductModel>}
     * @memberOf ProductService
     */
    async findAll(): Promise<IProductModel[]> {
        try {
            return await ProductModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise<IProductModel>}
     * @memberOf ProductService
     */
    async findOne(id:string) : Promise<IProductModel>{
        try {
            const validate:Joi.ValidationResult<{
                id:string
            }> = ProductValidation.get({
                id
            });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            return await ProductModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error){
            throw new Error(error.message);
        }
    },

    /**
     * @returns {Promise<IProductModel>}
     * @param body
     * @memberOf ProductService
     */
    async insert(body :IProductModel):Promise<IProductModel> {
        try {
            const validate: Joi.ValidationResult<IProductModel> = ProductValidation.create(body);
            console.log(body)
            if (validate.error){
                throw new Error(validate.error.message);
            }
            const product : IProductModel = await ProductModel.create(body);
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IProductModel} body
     * @returns {Promise< IProductModel >}
     * @memberOf ProductValidation
     */
    async update(body:IProductModel):Promise<IProductModel>{
        try {
            const validate : Joi.ValidationResult<IProductModel> = ProductValidation.update(body);
            if (validate.error){
                throw new Error(validate.error.message);
            }
            const product : IProductModel = await ProductModel.findByIdAndUpdate(body._id,body);
            return product;
        }catch (error) {
            throw new Error(error);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise< IProductModel >}
     * @memberOf ProductValidation
     */
    async remove(id : string):Promise<IProductModel> {
        try {
            const validate : Joi.ValidationResult<{
                id : string
            }> = ProductValidation.remove({
                id
            });
            if (validate.error){
                throw new Error(validate.error.message);
            }
            console.log(id);
            const product :IProductModel = await ProductModel.findByIdAndDelete({
                _id:Types.ObjectId(id)
            });
            return product;
        }catch (error){
            throw new Error(error.message);
        }
    }
};

export default ProductService;
