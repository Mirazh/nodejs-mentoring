import express from 'express';
import { userRouter } from './components';

const app: express.Application = express();
const PORT = 3000;

app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
