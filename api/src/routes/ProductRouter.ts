import {ProductComponent} from "../components";
import { Router } from 'express';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/product
 *
 * @swagger
 *  /product:
 *   post:
 *     description: Create new Product
 *     tags:
 *      - product
 *     requestBody:
 *       description: Product creation request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductSchema'
 *           example:
 *             full_name: "full_name"
 *     responses:
 *       '201':
 *         description: return created Product
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/ProductSchema'
 */
router.post('/', ProductComponent.create);

/**
 * PUT method route
 * @example http://localhost:PORT/product
 *
 * @swagger
 *  /product:
 *   post:
 *     description: Create new Product
 *     tags:
 *      - product
 *     requestBody:
 *       description: Product creation request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductSchema'
 *           example:
 *             full_name: "full_name"
 *     responses:
 *       '201':
 *         description: return updated Product
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/ProductSchema'
 */
router.put('/', ProductComponent.update);

/**
 * GET method route
 * @example http://localhost:PORT/products
 *
 * @swagger
 *  /product:
 *   post:
 *     description: GET ALL Products
 *     tags:
 *      - product
 *     requestBody:
 *       description: Product creation request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductSchema'
 *     responses:
 *       '201':
 *         description: return created Product
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/ProductSchema'
 */
router.get('/', ProductComponent.findAll);


/**
 * DELETE method route
 * @example http://localhost:PORT/products
 *
 * @swagger
 *  /product:
 *   post:
 *     description: DELETE Product
 *     tags:
 *      - product
 *     requestBody:
 *       description: Product creation request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductSchema'
 *     responses:
 *       '201':
 *         description: return created Product
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/ProductSchema'
 */
router.delete('/:id', ProductComponent.remove);


/**
 * GET method route
 * @example http://localhost:PORT/product/id
 *
 * @swagger
 *  /product:
 *   post:
 *     description: GET Product by id
 *     tags:
 *      - product
 *     responses:
 *       '201':
 *         description: return created Product
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/ProductSchema'
 */
router.get('/:id', ProductComponent.findOne);

export default router;
