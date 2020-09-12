import express from 'express';
import { apiRouter } from './routes';
import { connectToDB } from './config/dbConnect';

connectToDB().catch(console.error);

const app: express.Application = express();
const PORT = 3000;

app.use(express.json());
app.use(apiRouter);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
