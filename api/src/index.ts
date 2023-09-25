import express from 'express';
import * as Connection  from './commons/connection/connection';
import * as Middleware from './commons/middleware/middleware';
import * as Routes from './routes/index';
import serverless from 'serverless-http'

/**
 * @constant {express.Application}
 */
const app: express.Application = express();

/**
 * @constructs express.Application database
 */
Connection.init();

/**
 * @constructs express.Application Middleware
 */
Middleware.configure(app);

/**
 * @constructs express.Application Routes 
 */
Routes.init(app);

/**
 * @constructs express.Application Error Handler
 */
Middleware.initErrorHandler(app);

/**
 * @exports {express.Application}
 */
module.exports.handler = serverless(app);



