import { UserModel } from './model';
import { Op } from 'sequelize';
import { OrderType } from './Types';

export const Service = {
    findUserById: async (id: string): Promise<UserModel|null> => {
        return await UserModel
            .findOne({
                where: {
                    id
                },
                raw: true
            });
    },
    findAllUsersByLoginLike: async (likeString: string, order: OrderType, limit: number): Promise<Array<UserModel>|null> => {
        return await UserModel.findAll({
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
    createUser: async (user: UserModel): Promise<UserModel|null> => {
        return await UserModel.create(user);
    },
    updateUser: async (id: string, user: UserModel): Promise<void> => {
        await UserModel.update(user, {
            where: {
                id
            }
        });
    },
    findUserByLogin: async (login: string): Promise<UserModel|null> => {
        return await UserModel
            .findOne({
                where: {
                    login
                },
                raw: true
            });
    }
};
