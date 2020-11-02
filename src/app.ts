import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes';
import { connectToDB } from './config/dbConnect';
import { logger } from './utils/logger';
import { sendError } from './utils/response';
import { checkToken } from './utils/authentication';

const app: express.Application = express();
const PORT = 3000;
const customLogger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('HTTP method:', req.method);
    console.log('Request body:', req.body);
    console.log('Request params:', req.params);
    console.log('Request query:', req.query);

    next();
};
// eslint-disable-next-line no-unused-vars
const errorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    sendError(res, { message: err.message, method: 'errorHandler', params: { req } });
};

app.use(cors({ origin: true }));
app.use(express.json());
app.use(customLogger);
app.use(checkToken);
app.use(apiRouter);
app.use(errorHandler);

process.on('uncaughtException', (err: Error) => {
    logger.error(err);
});

connectToDB().then(() => app.listen(PORT, async (err: Error) => {
    if (err) {
        return logger.error(err);
    }

    logger.info(`App listening at http://localhost:${PORT}`);
}));
