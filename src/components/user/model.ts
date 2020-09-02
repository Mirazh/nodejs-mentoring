import { sequelize, Model, DataTypes, UUIDV4 } from '../../db/connect';

export class User extends Model {
    id: string | undefined
    login: string | undefined
    password: string | undefined
    age: number | undefined
    is_deleted: boolean | undefined
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: false
});

User.sync();
