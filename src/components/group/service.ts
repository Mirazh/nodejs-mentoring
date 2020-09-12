import { Group } from './model';

export const Service = {
    findGroupById: async (id: string): Promise<Group|null> => {
        return await Group
            .findOne({
                where: {
                    id
                },
                raw: true
            });
    },
    findAllGroups: async (): Promise<Array<Group>|null> => {
        return await Group.findAll();
    },
    createGroup: async (group: Group): Promise<Group|null> => {
        return await Group.create(group);
    },
    updateGroup: async (id: string, group: Group): Promise<void> => {
        await Group.update(group, {
            where: {
                id
            }
        });
    },
    deleteGroupById: async (id: string) => {
        await Group.destroy({
            where: {
                id
            }
        })
    }
};
