import "dotenv/config";
import { S3Client } from "@aws-sdk/client-s3"

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env. AWS_ACCESS_KEY_ID as string,  // store it in .env file to keep it safe
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    },
    region: "ap-southeast-1" // this is the region that you select in AWS account
})

export default s3