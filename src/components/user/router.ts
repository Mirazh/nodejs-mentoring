import express from 'express';
import { createUser, deleteUser, getUser, updateUser, getAutoSuggestUsers, login } from './controller';
import { validateSchema } from '../../utils/validator';
import { checkToken } from '../../utils/authentication';

const router = express.Router();

router.route('/user/:id')
    .get(checkToken, (req: express.Request, res: express.Response) => {
        getUser(req, res);
    })
    .put(checkToken, validateSchema('user'), (req: express.Request, res: express.Response) => {
        updateUser(req, res);
    })
    .delete(checkToken, (req: express.Request, res: express.Response) => {
        deleteUser(req, res);
    });

router.post('/user', checkToken, validateSchema('user'), (req: express.Request, res: express.Response) => {
    createUser(req, res);
});

router.get('/auto-suggest-users', checkToken, (req: express.Request, res: express.Response) => {
    getAutoSuggestUsers(req, res);
});

router.post('/login', (req: express.Request, res: express.Response) => {
    login(req, res);
});

export { router as userRouter };
