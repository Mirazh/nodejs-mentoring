import express from 'express';
import { apiRouter } from './routes';
import { connectToDB } from './config/dbConnect';
import { logger } from './utils/logger';
import { sendError } from './utils/response';

import { UserGroupService } from './components/userGroup';
import { Service as GroupService } from './components/group';

const app: express.Application = express();
const PORT = 3000;
const customLogger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('HTTP method:', req.method);
    console.log('Request body:', req.body);
    console.log('Request params:', req.params);
    console.log('Request query:', req.query);

    next();
};
const errorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    sendError(res, { message: err.message, method: 'errorHandler', params: [req, res] });
};

app.use(express.json());
app.use(customLogger);
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

    // await UserGroupService.addUserToGroup(
    //     '83499fc6-fa72-11ea-adc1-0242ac120002',
    //     ['01b7587c-fa72-11ea-adc1-0242ac120002', '01b75c14-fa72-11ea-adc1-0242ac120002']
    // );

    // await GroupService.deleteGroupById('83499fc6-fa72-11ea-adc1-0242ac120002')
}));
