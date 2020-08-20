import express from 'express';
import { User } from '../models/user';
import { createUser, deleteUser, getUser, updateUser, getAutoSuggestUsers } from '../controllers/user';
import { validateSchema } from '../utils/validator';

const router = express.Router();

router.route('/user/:id')
    .get((req: express.Request, res: express.Response) => {
        const user: User|string = getUser(req.params.id);

        res.send(JSON.stringify(user, null, 2));
    })
    .put(validateSchema('user'), (req: express.Request, res: express.Response) => {
        const user: User|string = updateUser(req.params.id, req.body);

        res.send(user);
    })
    .delete((req: express.Request, res: express.Response) => {
        const user: User|string = deleteUser(req.params.id);

        res.send(user);
    });

router.post('/user', validateSchema('user'), (req: express.Request, res: express.Response) => {
    const user: User = createUser(req.body);

    res.status(201).json(user);
});

router.get('/auto-suggest-users', (req: express.Request, res: express.Response) => {
    const suggestedUsers: Array<User> = getAutoSuggestUsers(req.query.login_substring, req.query.limit);

    res.json(suggestedUsers);
});

export { router as userRouter };
