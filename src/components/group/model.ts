import { sequelize, Model, DataTypes, UUIDV4 } from '../../config/dbConnect';
import { permissions } from './types'

export class Group extends Model {
    id: string | undefined
    name: string | undefined
    permissions: Array<permissions> | undefined
}

Group.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Group',
    timestamps: false
});

Group.sync();
