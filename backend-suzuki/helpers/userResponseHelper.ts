import { UserDatas } from "./accountDataMappers"
import { ResponseData } from "./responseHelper"

export interface AdminUserListRespose extends ResponseData {
    data: UserDatas [] | null
}

export interface AdminUserResponse extends ResponseData {
    data: UserDatas | null
}