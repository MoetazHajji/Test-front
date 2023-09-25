import * as express from 'express';
import * as http from 'http';
import { url } from 'inspector';
import { func } from 'joi';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import ProductRouter from './ProductRouter';
import UserRouter from './UserRouter';
import bodyParser from "body-parser";
import {FileComponent} from "../components";
import FileRouter from "./FileRouter";
import OrderRouter from "./OrderRouter";

/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
    const router: express.Router = express.Router();
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'LogRocket Express API with swagger',
                version: '0.1.0',
                description:
                    'This is a simple CRUD Application made with Express and documented with swagger',
                license: {
                    name: 'MIT',
                    url: 'https://spdx.org/licenses/MIT.html'
                },
            },
            servers: [
                {
                    url: 'http://localhost:3000'
                }
            ]
        },
        apis: ['**/**/*.ts']
    };

    /**
     * @description
     *  Forwards any requests to the /product URI to our ProductRouter
     * @constructs
     */
    app.use('/product', ProductRouter);

    /**
     * @description
     *  Forwards any requests to the /user URI to our ProductRouter
     * @constructs
     */
    app.use('/user', UserRouter);

    /**
     * @description
     *  Forwards any requests to the /file URI to our ProductRouter
     * @constructs
     */
    app.use('/file', FileRouter);

    /**
     * @description
     *  Forwards any requests to the /file URI to our ProductRouter
     * @constructs
     */
    app.use('/order', OrderRouter);



    const specs = swaggerJSDoc(options)
    /**
     * @description
     * Forwards any requests to the /api-docs URI to our swagger docs
     */
    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(specs, {explorer: true})
    );


    app.use(bodyParser.json());

    /**
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req, res, next) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });


    /**
     * @constructs all routes
     */
    app.use(router);
}
