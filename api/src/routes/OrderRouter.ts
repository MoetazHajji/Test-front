import {Router} from "express";
import {OrderComponent} from "../components";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/**
 * POST method route
 * @example http://localhost:PORT/order
 *
 * @swagger
 *  /order:
 *   post:
 *     description: Create new Order
 *     tags:
 *      - Order
 *     requestBody:
 *       description: Order creation request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderSchema'
 *           example:
 *             Ordername: "Ordername"
 *     responses:
 *       '201':
 *         description: return created Order
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/OrderSchema'
 */
router.post('/', OrderComponent.create);


/**
 * GET method route
 * @example http://localhost:PORT/order/id
 *
 * @swagger
 *  /order:
 *   post:
 *     description: GET Order by id
 *     tags:
 *      - order
 *     responses:
 *       '201':
 *         description: return created Order
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/OrderSchema'
 */
router.get('/:id', OrderComponent.findOne);

/**
 * DELETE method route
 * @example http://localhost:PORT/order
 *
 * @swagger
 *  /order:
 *   post:
 *     description: DELETE Order
 *     tags:
 *      - order
 *     requestBody:
 *       description: Order creation request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderSchema'
 *     responses:
 *       '201':
 *         description: return created Order
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/OrderSchema'
 */
router.delete('/:id', OrderComponent.remove);


/**
 * GET method route
 * @example http://localhost:PORT/orders
 *
 * @swagger
 *  /order:
 *   post:
 *     description: GET ALL Orders
 *     tags:
 *      - order
 *     requestBody:
 *       description: Order creation request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderSchema'
 *     responses:
 *       '201':
 *         description: return created Order
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/OrderSchema'
 */
router.get('/', OrderComponent.findAll);


/**
 * PUT method route
 * @example http://localhost:PORT/order
 *
 * @swagger
 *  /order:
 *   post:
 *     description: Create new Order
 *     tags:
 *      - order
 *     requestBody:
 *       description: Order creation request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderSchema'
 *           example:
 *             Ordername: "Ordername"
 *     responses:
 *       '201':
 *         description: return updated Order
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/OrderSchema'
 */
router.put('/', OrderComponent.update);

export default router;
