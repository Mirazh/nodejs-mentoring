import { GroupModel } from './model';

export const Service = {
    findGroupById: async (id: string): Promise<GroupModel|null> => {
        return await GroupModel
            .findOne({
                where: {
                    id
                },
                raw: true
            });
    },
    findAllGroups: async (): Promise<Array<GroupModel>|null> => {
        return await GroupModel.findAll();
    },
    createGroup: async (group: GroupModel): Promise<GroupModel|null> => {
        return await GroupModel.create(group);
    },
    updateGroup: async (id: string, group: GroupModel): Promise<void> => {
        await GroupModel.update(group, {
            where: {
                id
            }
        });
    },
    deleteGroupById: async (id: string) => {
        await GroupModel.destroy({
            where: {
                id
            }
        })
    }
};
