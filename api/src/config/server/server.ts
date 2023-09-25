import express from 'express';
import * as Middleware from '../../commons/middleware/middleware';
import * as Routes from '../../routes';
import ProductRouter from "../../routes/ProductRouter";

/**
 * @constant {express.Applicaiton}
 */
const app:express.Application = express();

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
 * sets port 3000 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3000 );

/**
 * sets secret to 'superSecret' , otherwise specified in the environment
 */
app.set('secret', process.env.SECRET || 'superSecret');

app.use('/product', ProductRouter)

/**
 * @exports {express.Application}
 */
export default app;
