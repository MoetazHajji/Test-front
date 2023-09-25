import {Condition, IOrderService} from "./interface";
import OrderModel,{IOrderModel} from "./model";
import OrderValidation from "./validation";
import {Types} from "mongoose";
import * as Joi from 'joi';
/**
 * @export
 * @extends {IOrderService}
 */
const OrderService: IOrderService = {
    /**
     * @returns {Promise<any>}
     * @memberof OrderService
     */
    async findAll(limit: number, page:number, id:string,userId:string): Promise<any> {
        var sort = {createdAt: -1} ;
        let condition : Condition = <Condition>{};

        if (userId){
            condition.userId = userId;
            try {
                console.log(OrderModel.find(condition))
                return OrderModel.find(condition).where('deletion-date',null).sort(sort).limit(limit).skip((page -1 ) *limit);
            }catch (err){
                throw Error(err.message);
            }
        }else if(id === undefined){
            return OrderModel.find().sort(sort).limit(limit).skip((page -1) * limit);
        }
        if (limit > 50){
            throw new Error('invalid limit');
        }else if (limit <0 || limit === 0){
            throw new Error('invalid limit number, should start with 1');
        }else if (id != undefined){
            try {
                return await OrderModel.find({_id:id});
            } catch (error) {
                console.log("Order Not Found")
                throw new Error(error);
            }
        }

        else if(id === undefined){
            return OrderModel.find().sort(sort).limit(limit).skip((page -1) * limit);
        }
    },

    /**
     *@returns {Promise<IOrderModel>}
     * @param id
     * @memberof OrderService
     */
    async remove(id: string): Promise<IOrderModel> {
        try {
            const  validate: Joi.ValidationResult<{
                id:string
            }> = OrderValidation.remove({
                id
            });
            if (validate.error){
                throw new Error(validate.error.message);
            }
            const order : IOrderModel = await OrderModel.findByIdAndRemove({
                _id:Types.ObjectId(id)
            });
            return order;
        }catch (err){
            throw new Error(err.message)
        }
    },

    /**
     * @returns {Promise<IOrderModel>}
     * @param id
     * @memberof OrderService
     */
    async findOne(id: string): Promise<IOrderModel> {
        try {
            const validate : Joi.ValidationResult<{
                id:string
            }> = OrderValidation.get({
                id
            });
            if (validate.error){
                throw new Error(validate.error.message);
            }
            const order : IOrderModel = await OrderModel.findOne({
                _id:Types.ObjectId(id)
            })
            return order;
        }catch (err){
            throw new Error(err.message)
        }
    },
    /**
     * @returns {Promise<IOrderModel>}
     * @param orderModel
     * @memberof OrderValidation
     */
    async insert(orderModel: IOrderModel): Promise<IOrderModel> {
        try {
            const validate:Joi.ValidationResult<IOrderModel> = OrderValidation.create(orderModel);
            if (validate.error){
                throw new Error(validate.error.message);
            }
            const order:IOrderModel = await OrderModel.create(orderModel);
            return order;
        }catch (err){
            throw new Error(err.message)
        }
    },

    /**
     *
     * @param orderModel
     */
    async update(orderModel: IOrderModel): Promise<IOrderModel> {
        try {
            const validate:Joi.ValidationResult<IOrderModel> = OrderValidation.update(orderModel);
            if (validate.error){
                throw new Error(validate.error.message);
            }
            const order:IOrderModel = await OrderModel.findByIdAndUpdate(orderModel._id,orderModel);
            return order;
        } catch (err){
            throw new Error(err.message)
        }
    }

}

export default OrderService;
