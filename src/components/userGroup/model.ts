import { sequelize, Model, DataTypes, UUIDV4 } from '../../config/dbConnect';
import { UserModel, GroupModel } from '../../components'

export class UserGroup extends Model {
    id: string | undefined
}

UserGroup.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
}, {
    sequelize,
    modelName: 'UserGroup',
    timestamps: false
});

UserModel.belongsToMany(GroupModel, {
    through: UserGroup,
    foreignKey: 'user_id'
});
GroupModel.belongsToMany(UserModel, {
    through: UserGroup,
    foreignKey: 'group_id'
});
