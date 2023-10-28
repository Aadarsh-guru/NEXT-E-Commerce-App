import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});

const DeleteFromS3 = async (url) => {
    try {
        if (!url.startsWith(`https://${process.env.BUCKET_NAME}.s3.amazonaws.com/`)) {
            return { success: true }
        }
        const key = url.replace(`https://${process.env.BUCKET_NAME}.s3.amazonaws.com/`, '');
        await s3Client.send(new DeleteObjectCommand({
            Key: key,
            Bucket: process.env.BUCKET_NAME
        }))
        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

export default DeleteFromS3;