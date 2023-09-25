import {Router} from "express";
import {FileComponent} from "../components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/files
 *     responses:
 *       '201':
 *         description: return created File
 */
router.post('/', FileComponent.create);

/**
 * GET method route
 * @example http://localhost:PORT/files
 *     responses:
 *      '200':
 *        description: An array of File
 *      '400':
 *        description: "Invalid status value"
 */
router.get('/',FileComponent.findAll);

/**
 * PUT method route
 * @example http://localhost:PORT/files
 *    responses:
 *      '201':
 *        description: return updated File
 *      '400':
 *        description: "Invalid status value"
 */
router.put('/', FileComponent.update);

/**
 * GET method route
 * @example http://localhost:PORT/file/id
 *
 * @swagger
 *  /file:
 *   post:
 *     description: GET FIle by id
 *     tags:
 *      - product
 *     responses:
 *       '201':
 *         description: return created Product
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/FileSchema'
 */
router.get('/:id', FileComponent.findOne);

/**
 * DELETE method route
 * @example  http://localhost:PORT/files/:id
 *
 * @swagger
 *  /files/{_id}:
 *   delete:
 *    description: Delete Files by File Id
 *    responses:
 *     '200':
 *        description: return deleted File
 *     '400':
 *        description: "Invalid status value"
 */
router.delete('/:id', FileComponent.remove);


/**
 * @export {express.Router}
 */
export default router;
