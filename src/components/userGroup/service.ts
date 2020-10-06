import { UserGroup } from './model';
import { sequelize } from '../../config/dbConnect';

export const Service = {
    addUserToGroup: async (groupId: string, userIds: string[]): Promise<void|Error> => {
        const transaction = await sequelize.transaction();

        const data = userIds.map(userId => ({
            user_id: userId,
            group_id: groupId
        }));

        try {
            await UserGroup.bulkCreate(data, { transaction });

            return await transaction.commit();
        } catch (error) {
            await transaction.rollback();

            return error;
        }
    }
};
