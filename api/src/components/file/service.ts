import {Condition, IFileService} from "./interface";
import FileModel, {IFileModel} from './model';
import * as Joi from 'joi';
import FileValidation from './validation';
import {Types} from "mongoose";
import AWS from 'aws-sdk';

const cryptName = (key: string): string => {
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', key + new Date(Date.now()).toString());
    const data = hmac.update('nodejsera');
    const hash = data.digest('hex');
    return hash;
}



/**
 * @export
 * @implements {IFileService}
 */
const FileService: IFileService = {
    /**
     * @param {number} limit
     * @param {number} page
     * @param {string} lastId
     * @param {string} productId
     * @returns {Promise < any >}
     * @memberof FileService
     */
    async findAll(limit: number, page: number, lastId: string,userId: string,productId: string): Promise<any> {
        const sort  = {createdAt: -1};
        let condition: Condition = <Condition>{};
        if (userId){
            condition.userId = userId;
        }
        if (productId){
            condition.productId = productId;
        }
        if (limit > 50){
            throw new Error('invalid limit');
        }else if (limit < 0 || limit === 0){
            throw new Error('invalid limit number , should start with 1');
        }else {
            try {
                return FileModel.find(condition).where('deletion-date',null).sort(sort).limit(limit).skip((page -1) *limit);
            }catch (err){
                throw new Error(err.message);
            }
        }
    },

    /**
     * @param {string} id
     * @param {boolean} signed
     * @returns {Promise < IFileModel >}
     * @memberof FileService
     */
    async findOne(id: string, signed: any): Promise<IFileModel> {
        try {
            const validate: Joi.ValidationResult<{
                id:string
            }> = FileValidation.get({
                id
            });
            if (validate.error){
                throw new Error(validate.error.message);
            }
            let file: IFileModel = await FileModel.findOne({
                _id:Types.ObjectId(id),
                deletion_date: {$exists : false}
            });
            if (signed != undefined && JSON.parse(signed) && file != null){
                const s3 = new AWS.S3();
                const bucket_name = process.env.BUCKET_NAME;
                const fileKey =file.path + file.hash;

                s3.putObjectAcl({
                    AccessControlPolicy : {},
                    Bucket: bucket_name.toString(),
                    GrantRead : 'uri=http://acs.amazonaws.com/groups/global/AuthenticatedUsers',
                    Key: fileKey.toString(),
                    ACL:'authenticated-read'
                });

                const signedUrl = s3.getSignedUrl('getObject', {
                    Bucket: bucket_name.toString(),
                    Key: fileKey.toString()
                });

                const jsonString = JSON.stringify(file);
                const startIndex =1;
                const endIndex= jsonString.lastIndexOf('}');
                const updatedJsonString = jsonString.substring(startIndex , endIndex) + ',"url":"' + signedUrl.toString()+'"';
                const blob = JSON.parse('{' + updatedJsonString + '}');
                return blob;
            }
            return file;
        }catch (err){
            throw new Error(err.message);
        }
    },
    /**
     * @param {IFileModel} body
     * @returns { Promise <IFileModel> }
     * @memberOf FileService
     */
    async insert(body: IFileModel, render: string): Promise<IFileModel> {
        try {
            const validation:Joi.ValidationResult<IFileModel> = FileValidation.create(body);
            if (validation.error){
                throw new Error(validation.error.message);
            }
            const path = 'public/' + new Date().getUTCFullYear() + '/' + Number(new Date().getUTCMonth() +1) + '/' + new Date().getUTCDate() + '/';
            if (render != undefined){
                const hash =cryptName(render);
                body.hash = hash;
            }
            body.path = path
            const File:IFileModel = await FileModel.create(body);
            return File;
        }catch (err){
            throw new Error(err.message);
        }
    },

    /**
     * @param {IFileModel} body
     * @returns { Promise <IFileModel> }
     * @memberOf FileService
     */
    async update(body : IFileModel) : Promise<IFileModel>{
        try {
            const validation:Joi.ValidationResult<IFileModel> = FileValidation.update(body);
            if (validation.error){
                throw new Error(validation.error.message);
            }
            const File:IFileModel = await FileModel.findByIdAndUpdate(body._id,body , {new : true});
            return File;
        }catch (err){
            throw new Error(err.message);
        }
    },

    /**
     * @param {string} id
     * @returns { Promise <IFileModel>}
     * @memberOf FileService
     */
    async remove(id: string): Promise<IFileModel> {
        try {
            const validation : Joi.ValidationResult<{
                id:string
            }> = FileValidation.remove({id})
            if (validation.error){
                throw new Error(validation.error.message);
            }
            const Post : IFileModel = await FileModel.findByIdAndUpdate(
                { _id : Types.ObjectId(id)},
                {
                    deletion_date : new Date(Date.now()),
                    function(err: any, res: any){
                        if (err) {
                            throw new Error(err.message);
                        } else {
                            console.debug(res);
                        }
                    },
                }
            );
            return Post;
        }catch (err){
            throw new Error(err.message);
        }
    }
}

export default FileService;
