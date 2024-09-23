import mongoose from "mongoose";
import bcryptHelpers from "../helpers/bcryptHelper";
import { errorResponse, successResponse } from "../helpers/responseHelper";
import { generateToken } from "../middlewares/verifyToken";
import { AdminAccountService, CustomerAccountService, UserAccountServiceFactory } from "./userAccountService";
import "dotenv/config";

//Fatory Pattern 
class AuthFactory {
    constructor(){}
    public authType(name: string){
        switch (name) {
            case "admin":
                return new AdminAndDealerLoginService("admin")
            case "dealer":
                return new AdminAndDealerLoginService("dealer")
            case "user":
                return new AdminAndDealerLoginService("user")
    
        default:
            return new AdminAndDealerLoginService("admin")
        }
    }
}
class AdminAndDealerLoginService {
    private type: string
    constructor(type: string){
        this.type = type
    }
    async login(data: { email?: string; password: string, code?: string, phone?: number}){
        const AdminObject: any = new UserAccountServiceFactory().accountType(this.type)
        let query: { email?: string, code?: string, isDeleted: boolean, phone?: number } = { isDeleted: false }
        data.email ? query["email"] = data.email : ""
        data.code ? query["code"] = data.code : ""
        data.phone ? query["phone"] = data.phone : ""
        //check user exist or not 
        const checkUser: any = await AdminObject.read(query)
        if(process.env.NODE_ENV === 'development'){
            console.log("query is ",query, checkUser, AdminObject)
        }
        if(!checkUser) return errorResponse({statusCode: 404, message: "User doesn't exist", data: null})
        const checkPassword = await bcryptHelpers.decrypt(data.password, checkUser.password)
        if(!checkPassword) return errorResponse({statusCode: 403, message: "Wrong Password", data: null})
        const token = generateToken({id: new mongoose.Types.ObjectId(checkUser._id!), email: checkUser.email, isSuperAdmin: checkUser.isSuperAdmin})
        return successResponse({statusCode: 200, message: "Successfully Logined", data: checkUser, token: token}) 
    }
    logout(){}
}

// class UserLoginService {
//     login(){}
//     logout(){}
// }

export default new AuthFactory() 