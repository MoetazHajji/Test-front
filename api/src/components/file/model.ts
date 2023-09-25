import {IModel} from "../../commons/component/model";
import {Schema} from "mongoose";
import * as connections from '../../commons/connection/connection';

/**
 * @export
 * @interface IFileModel
 * @extends {Document}
 */
export interface IFileModel extends IModel {
    type: string;
    name: string;
    hash: string;
    path: string;
    userId: string;
    productId: string;
    updatedAt:string;
    createdAt:string;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    FileSchema:
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *        type:
 *          type: string
 *        URL_ORIGINAL:
 *          type: string
 *        URL_SIMPLE:
 *          type: string
 *        hash:
 *          type: string
 *        deletion_date:
 *          type: string
 *        updatedAt:
 *          type: string
 *        createdAt:
 *          type: string
 *    Files:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/FileSchema'
 */
const FileSchema: Schema = new Schema({
    type: {type: String},
    name: {type: String},
    hash: {type: String},
    path: {type: String},
    userId: {type: String},
    productId: {type: String},
    updatedAt : {type : String},
    createdAt : {type : String},
}, {
    timestamps: true,
    collection: 'FileModel',
    versionKey: false
});

export default connections.db.model<IFileModel>('FileModel', FileSchema);
