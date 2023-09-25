import {UserComponent} from "../components";
import { Router } from 'express';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/user
 *
 * @swagger
 *  /user:
 *   post:
 *     description: Create new User
 *     tags:
 *      - User
 *     requestBody:
 *       description: User creation request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSchema'
 *           example:
 *             username: "username"
 *     responses:
 *       '201':
 *         description: return created User
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 */
router.post('/', UserComponent.create);

/**
 * GET method route
 * @example http://localhost:PORT/user/id
 *
 * @swagger
 *  /user:
 *   post:
 *     description: GET User by id
 *     tags:
 *      - user
 *     responses:
 *       '201':
 *         description: return created User
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 */
router.get('/:id', UserComponent.findOne);

/**
 * DELETE method route
 * @example http://localhost:PORT/user
 *
 * @swagger
 *  /user:
 *   post:
 *     description: DELETE User
 *     tags:
 *      - user
 *     requestBody:
 *       description: User creation request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSchema'
 *     responses:
 *       '201':
 *         description: return created User
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 */
router.delete('/:id', UserComponent.remove);


/**
 * GET method route
 * @example http://localhost:PORT/users
 *
 * @swagger
 *  /user:
 *   post:
 *     description: GET ALL Users
 *     tags:
 *      - user
 *     requestBody:
 *       description: User creation request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSchema'
 *     responses:
 *       '201':
 *         description: return created User
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 */
router.get('/', UserComponent.findAll);

/**
 * PUT method route
 * @example http://localhost:PORT/user
 *
 * @swagger
 *  /user:
 *   post:
 *     description: Create new User
 *     tags:
 *      - user
 *     requestBody:
 *       description: User creation request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSchema'
 *           example:
 *             username: "username"
 *     responses:
 *       '201':
 *         description: return updated User
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 */
router.put('/', UserComponent.update);
export default router;
