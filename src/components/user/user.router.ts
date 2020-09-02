import express from 'express';
import { createUser, deleteUser, getUser, updateUser, getAutoSuggestUsers } from './user.controller';
import { validateSchema } from '../../utils/validator';

const router = express.Router();

router.route('/user/:id')
    .get(async (req: express.Request, res: express.Response) => {
        await getUser(req, res);
    })
    .put(validateSchema('user'), async (req: express.Request, res: express.Response) => {
        await updateUser(req, res);
    })
    .delete(async (req: express.Request, res: express.Response) => {
        await deleteUser(req, res);
    });

router.post('/user', validateSchema('user'), async (req: express.Request, res: express.Response) => {
    await createUser(req, res);
});

router.get('/auto-suggest-users', async (req: express.Request, res: express.Response) => {
    await getAutoSuggestUsers(req, res);
});

export { router as userRouter };
