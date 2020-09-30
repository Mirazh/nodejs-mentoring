import express from 'express';
import { userRouter, groupRouter } from './components';

const apiRouter = express.Router();

apiRouter.use('/', userRouter);
apiRouter.use('/', groupRouter);

export { apiRouter };
