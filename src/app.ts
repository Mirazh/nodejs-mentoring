import express from 'express';
import { apiRouter } from './routes';
import { connectToDB } from './config/dbConnect';

const app: express.Application = express();
const PORT = 3000;

app.use(express.json());
app.use(apiRouter);

connectToDB().then(() => app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
}));
