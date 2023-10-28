import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});

export const POST = async (NextRequest) => {
    try {
        const { key } = await NextRequest.json()
        const putCommand = new PutObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: key })
        const putPresignedUrl = await getSignedUrl(s3Client, putCommand, { expiresIn: 600 });
        const getUrl = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${key}`
        return NextResponse.json({ uploadUrl: putPresignedUrl, getUrl: getUrl, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}
