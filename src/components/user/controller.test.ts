import sinon from 'sinon';
import HTTP_STATUS from 'http-status';
import assert from 'assert';
import { mockResponse, mockRequest } from '../../utils/testing';
import { Op } from 'sequelize';
import { UserModel } from './model';
import { UserType } from './types';
import { getUser, createUser, updateUser, deleteUser, getAutoSuggestUsers, login } from './controller';

const sandbox = sinon.createSandbox();

type MOCKS_TYPE = {
    FIND_USER_BY_ID_QUERY: Object,
    FIND_USER_BY_LOGIN_QUERY: Object,
    FIND_USERS_LIKE_QUERY: Object,
    USERS: Array<any>,
    NEW_USER: UserType,
    DELETED_USER: UserType,
}

const MOCKS: MOCKS_TYPE = {
    FIND_USER_BY_ID_QUERY: {
        where: {
            id: '1'
        },
        raw: true
    },
    FIND_USER_BY_LOGIN_QUERY: {
        where: {
            login: 'user@gmail.com'
        },
        raw: true
    },
    FIND_USERS_LIKE_QUERY: {
        where: {
            login: {
                [Op.like]: '%user%'
            }
        },
        order: [
            ['login', 'ASC']
        ],
        limit: 1
    },
    USERS: [
        {
            id: '1',
            login: 'user@gmail.com',
            password: 'Qwer1234',
            age: 80,
            is_deleted: false
        },
        {
            id: '2',
            login: 'user2@gmail.com',
            password: 'Qwer1234',
            age: 80,
            is_deleted: false
        }
    ],
    NEW_USER: {
        login: 'user@gmail.com',
        password: 'Qwer1234',
        age: 80,
        is_deleted: false
    },
    DELETED_USER: {
        login: 'user@gmail.com',
        password: 'Qwer1234',
        age: 80,
        is_deleted: false
    }
};

describe('User controller', () => {
    beforeAll(() => {
        const findOneUserStub = sandbox.stub(UserModel, 'findOne');
        findOneUserStub.withArgs(MOCKS.FIND_USER_BY_ID_QUERY).resolves(MOCKS.USERS[0]);
        findOneUserStub.withArgs(MOCKS.FIND_USER_BY_LOGIN_QUERY).resolves(MOCKS.USERS[0]);

        const findAllUserStub = sandbox.stub(UserModel, 'findAll');
        findAllUserStub.withArgs(MOCKS.FIND_USERS_LIKE_QUERY).resolves([MOCKS.USERS[0]]);

        const createUserStub = sandbox.stub(UserModel, 'create');
        createUserStub.withArgs(MOCKS.NEW_USER).resolves(MOCKS.USERS[0]);

        const updateUserStub = sandbox.stub(UserModel, 'update');
        updateUserStub.calledWith([MOCKS.USERS[0], MOCKS.FIND_USER_BY_ID_QUERY]);
        updateUserStub.calledWith([MOCKS.DELETED_USER, MOCKS.FIND_USER_BY_ID_QUERY]);
    });

    test('should get user', async () => {
        const req = mockRequest({
            params: {
                id: MOCKS.USERS[0].id
            }
        });
        const res = mockResponse();

        await getUser(req, res);

        const result = res.jsonData.user;

        assert.strictEqual(res.statusCode, HTTP_STATUS.OK);
        assert.deepStrictEqual(MOCKS.USERS[0], result);
    });

    test("shouldn't get user and return error status", async () => {
        const req = mockRequest({
            params: {
                id: '999'
            }
        });
        const res = mockResponse();

        await getUser(req, res);

        assert.strictEqual(res.statusCode, HTTP_STATUS.NOT_FOUND);
    });

    test('should create user', async () => {
        const req = mockRequest({
            body: MOCKS.NEW_USER
        });
        const res = mockResponse();

        await createUser(req, res);

        const result = res.jsonData.user;

        assert.strictEqual(res.statusCode, HTTP_STATUS.CREATED);
        assert.deepStrictEqual(MOCKS.USERS[0], result);
    });

    test('should update user', async () => {
        const req = mockRequest({
            params: {
                id: MOCKS.USERS[0].id
            },
            body: MOCKS.NEW_USER
        });
        const res = mockResponse();

        await updateUser(req, res);

        assert.strictEqual(res.statusCode, HTTP_STATUS.OK);
    });

    test('should delete user', async () => {
        const req = mockRequest({
            params: {
                id: MOCKS.USERS[0].id
            }
        });
        const res = mockResponse();

        await deleteUser(req, res);

        assert.strictEqual(res.statusCode, HTTP_STATUS.OK);
    });

    test('should get suggested users', async () => {
        const req = mockRequest({
            query: {
                login_substring: 'user',
                limit: 1,
                order: { field: 'login', type: 'ASC' }
            }
        });
        const res = mockResponse();

        await getAutoSuggestUsers(req, res);

        const result = res.jsonData.suggestedUsers;

        assert.strictEqual(res.statusCode, HTTP_STATUS.OK);
        assert.deepStrictEqual([MOCKS.USERS[0]], result);
    });

    test('should login user', async () => {
        const req = mockRequest({
            body: {
                login: MOCKS.USERS[0].login,
                password: MOCKS.USERS[0].password
            }
        });
        const res = mockResponse();

        await login(req, res);

        const result = res.jsonData.token;

        assert.strictEqual(res.statusCode, HTTP_STATUS.OK);
        assert.ok(!!result);
    });
});
