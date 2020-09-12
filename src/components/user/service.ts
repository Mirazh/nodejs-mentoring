import { User } from './model';
import { Op } from 'sequelize';
import { OrderType } from './Types';

export const Service = {
    findUserById: async (id: string): Promise<User|null> => {
        return await User
            .findOne({
                where: {
                    id
                },
                raw: true
            });
    },
    findAllUsersByLoginLike: async (likeString: string, order: OrderType, limit: number): Promise<Array<User>|null> => {
        return await User.findAll({
            where: {
                login: {
                    [Op.like]: `%${likeString}%`
                }
            },
            order: [
                [order.field, order.type]
            ],
            limit
        });
    },
    createUser: async (user: User): Promise<User|null> => {
        return await User.create(user);
    },
    update: async (id: string, user: User): Promise<void> => {
        await User.update(user, {
            where: {
                id
            }
        });
    }
};
