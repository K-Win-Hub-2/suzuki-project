// helpers/responseHelper.ts

interface NormalResponse {
    statusCode: number,
    data: any,
    message: string,
    token?: string
}

const successResponse = (params: NormalResponse) => {
    return { success: true, ...params };
};

const errorResponse = (params: NormalResponse) => {
    return { success: false, ...params };
};

interface ResponseData {
    statusCode: number;
    message: string;
}

export { successResponse, errorResponse, ResponseData, NormalResponse };