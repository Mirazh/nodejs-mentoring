import express from 'express';
import { userRouter } from './components';
import { connectToDB } from './db/connect';

connectToDB().catch(console.error);

const app: express.Application = express();
const PORT = 3000;

app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
