import express from 'express';
import { apiRouter } from './routes';

const app: express.Application = express();
const PORT = 3000;

app.use(express.json());
app.use(apiRouter);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
