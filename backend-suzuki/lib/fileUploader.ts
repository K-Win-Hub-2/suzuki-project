import multer from "multer"
import multerS3 from "multer-s3"
import s3 from "../config/s3FileServerConfig"
import "dotenv/config";
import { Request } from 'express'
import path from "path"

const S3Storage = multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME as string,
    metadata: (req: any, file: any, cb: any)  => {
        console.log("me",file)
        cb(null, {fieldname: file.fieldname})
    },
    key: (req: any, file: any, cb: any) => {
        if(process.env.NODE_ENV === "development") {
            console.log("file",file)
        }
        const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
        cb(null, fileName);
    }
})

function sanitizeFile(file: any, cb: any) {
    // Define the allowed extension
    const fileExts = [".png", ".jpg", ".jpeg", ".gif", ".mp4", ".mpeg-4",".mov", ".avi", ".wmv", ".avchd", ".webm", ".flv"];

    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb("Error: File type not allowed!");
    }
}

const S3UploadImage = multer({
    storage: S3Storage,
    fileFilter: (req: Request, file: any, callback: any) => {
        sanitizeFile(file, callback)
    },
    limits: {
        fileSize: 1024 * 1024 * 2 // 2mb file size
    }
})

export default S3UploadImage