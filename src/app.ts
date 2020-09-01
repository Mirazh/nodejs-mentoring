import express from 'express';
import { userRouter } from './components';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/node_mentoring');

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

connect().catch(console.error);

const app: express.Application = express();
const PORT = 3000;

app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
