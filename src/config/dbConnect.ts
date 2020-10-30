import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// @ts-ignore
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
});

export const connectToDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { Model, DataTypes, UUIDV4, Optional } from 'sequelize';
