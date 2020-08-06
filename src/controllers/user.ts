import { v4 as uuid } from 'uuid';
import { User } from '../models/user';

const usersList: User[] = [];

export const getUser = (userId: string): User|string => {
    return usersList.find(user => user.id === userId) || 'User not found';
};

export const createUser = (user: User): User => {
    const createdUser: User = { ...user, id: uuid() };

    usersList.push(createdUser);

    return createdUser;
};

export const updateUser = (userId: string, updatedUser: User): User|string => {
    const userIndex: number = usersList.findIndex(user => user.id === userId);

    if (userIndex >= 0) {
        usersList.splice(userIndex, 1, { ...updatedUser, id: userId });

        return updatedUser;
    }

    return 'User not found';
};

export const deleteUser = (userId: string) => {
    usersList.find(user => {
        if (user.id === userId) {
            user.isDeleted = true;

            return true;
        }
    });
};

export const getAutoSuggestUsers = (loginSubstring: any, limit: any) => {
    return usersList
        .sort((a: User, b: User) => {
            if (a.login < b.login) {
                return -1;
            }

            if (a.login > b.login) {
                return 1;
            }

            return 0;
        })
        .reduce((users: Array<User>, user: User): Array<User> => {
            if (users.length === Number(limit)) {
                return users;
            }

            if (user.login.toLocaleLowerCase().includes(loginSubstring.toLocaleLowerCase())) {
                users.push(user);
            }

            return users;
        }, []);
};
