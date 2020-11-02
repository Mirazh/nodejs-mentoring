import sinon from 'sinon';
import HTTP_STATUS from 'http-status';
import assert from 'assert';
import { mockResponse, mockRequest } from '../../utils/testing';
import { GroupModel } from './model';
import { GroupType } from './types';
import { getGroup, createGroup, updateGroup, deleteGroup, getAllGroups } from './controller';

const sandbox = sinon.createSandbox();

type MOCKS_TYPE = {
    FIND_GROUP_BY_ID_QUERY: Object,
    GROUPS: Array<any>,
    NEW_GROUP: GroupType,
}

const MOCKS: MOCKS_TYPE = {
    FIND_GROUP_BY_ID_QUERY: {
        where: {
            id: '1'
        },
        raw: true
    },
    GROUPS: [
        {
            id: '1',
            name: 'NodeJS',
            permissions: ['READ', 'WRITE']
        },
        {
            id: '2',
            name: 'Express',
            permissions: ['READ', 'WRITE', 'DELETE']
        }
    ],
    NEW_GROUP: {
        name: 'NodeJS',
        permissions: ['READ', 'WRITE']
    }
};

describe('User controller', () => {
    beforeAll(() => {
        const findOneGroupStub = sandbox.stub(GroupModel, 'findOne');
        findOneGroupStub.withArgs(MOCKS.FIND_GROUP_BY_ID_QUERY).resolves(MOCKS.GROUPS[0]);

        const findAllUserStub = sandbox.stub(GroupModel, 'findAll');
        findAllUserStub.withArgs().resolves(MOCKS.GROUPS);

        const createGroupStub = sandbox.stub(GroupModel, 'create');
        createGroupStub.withArgs(MOCKS.NEW_GROUP).resolves(MOCKS.GROUPS[0]);

        const updateDeleteStub = sandbox.stub(GroupModel, 'update');
        updateDeleteStub.calledWith([MOCKS.GROUPS[0], MOCKS.FIND_GROUP_BY_ID_QUERY]);

        const deleteGroupStub = sandbox.stub(GroupModel, 'destroy');
        deleteGroupStub.calledWith(MOCKS.FIND_GROUP_BY_ID_QUERY);
    });

    test('should get group', async () => {
        const req = mockRequest({
            params: {
                id: MOCKS.GROUPS[0].id
            }
        });
        const res = mockResponse();

        await getGroup(req, res);

        const result = res.jsonData.group;

        assert.strictEqual(res.statusCode, HTTP_STATUS.OK);
        assert.deepStrictEqual(MOCKS.GROUPS[0], result);
    });

    test('should get all groups', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await getAllGroups(req, res);

        const result = res.jsonData.groups;

        assert.strictEqual(res.statusCode, HTTP_STATUS.OK);
        assert.deepStrictEqual(MOCKS.GROUPS, result);
    });

    test('should create group', async () => {
        const req = mockRequest({
            body: MOCKS.NEW_GROUP
        });
        const res = mockResponse();

        await createGroup(req, res);

        const result = res.jsonData.group;

        assert.strictEqual(res.statusCode, HTTP_STATUS.CREATED);
        assert.deepStrictEqual(MOCKS.GROUPS[0], result);
    });

    test('should update group', async () => {
        const req = mockRequest({
            params: {
                id: MOCKS.GROUPS[0].id
            },
            body: MOCKS.NEW_GROUP
        });
        const res = mockResponse();

        await updateGroup(req, res);

        assert.strictEqual(res.statusCode, HTTP_STATUS.OK);
    });

    test('should delete group', async () => {
        const req = mockRequest({
            params: {
                id: MOCKS.GROUPS[0].id
            }
        });
        const res = mockResponse();

        await deleteGroup(req, res);

        assert.strictEqual(res.statusCode, HTTP_STATUS.OK);
    });
});
