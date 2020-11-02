export const mockRequest = (params?: Object) => {
    return {
        ...params
    };
};
export const mockResponse = () => {
    const res: any = {
        jsonData: {},
        statusCode: null,
        json: () => {},
        status: () => {}
    };

    res.status = (status: number) => {
        res.statusCode = status;

        return res;
    };
    res.json = (data: Object) => {
        res.jsonData = data;

        return res;
    };

    return res;
};
