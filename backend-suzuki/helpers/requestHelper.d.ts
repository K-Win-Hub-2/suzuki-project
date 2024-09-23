// import { Request } from "express"
// import jwt from "jsonwebtoken"

// interface AuthRequest extends Request {
//     user: {
//         id: string,
//         email: string,
//         isSuperAdmin: boolean
//     }
// }


// export { AuthRequest }
import { Request } from 'express';

declare global {
    namespace Express {
       export interface Request {
            user: any
    }
}
}

interface CustomRequest extends Request {
    user?: any;
}

export { CustomRequest };