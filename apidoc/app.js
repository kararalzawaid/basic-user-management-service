import express from 'express';
import bodyParser from 'body-parser';
import dotenvLibrary from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './apidoc/swagger.json';
import db from './models';

// Routes
import userRoutes from './routes/user.routes';

// DB
db.sequelize.sync();

// ENV
dotenvLibrary.config();

// Express config
const app = express();
const router = express.Router();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '100mb', extended: true }));

// Routes
app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

userRoutes(router);

const port = process.env.SERVER_PORT || 4000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

export default server;
