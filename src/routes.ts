import express from 'express';
import { userRouter } from './components';

const apiRouter = express.Router();

apiRouter.use('/', userRouter);

export { apiRouter };
