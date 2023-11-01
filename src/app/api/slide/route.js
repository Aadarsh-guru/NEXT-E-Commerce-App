import { NextResponse } from "next/server";
import connect from "@/config/dbConfig";
import { getServerSession } from "next-auth";
import authOptions from "@/helpers/nextAuthOptions";
import Slides from "@/models/SlidesModel";
import DeleteFromS3 from "@/helpers/DeleteFromS3";

export const POST = async (request) => {
    await connect()
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'unauthorized access.', success: false }, { status: 401 })
        }
        const { url, image } = await request.json();
        if (!url || !image) {
            return NextResponse.json({ message: 'url and image is required.', success: false }, { status: 400 })
        }
        const slideDocument = await Slides.findOne({})
        if (slideDocument) {
            slideDocument.slides.push({ url, image })
            await slideDocument.save()
        } else {
            await Slides.create({ slides: [{ url, image }] })
        }
        return NextResponse.json({ message: 'Slide uploaded successfully.', success: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: 'error in upload slide api.', success: false, error: error.message }, { status: 500 })
    }
}


export const GET = async () => {
    await connect();
    try {
        const slideDocument = await Slides.findOne({})
        if (slideDocument) {
            return NextResponse.json({ slides: slideDocument.slides, success: true, message: 'all slides fetched successfully.' }, { status: 200 })
        } else {
            return NextResponse.json({ slides: [], success: true, message: 'all slides fetched successfully.' }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ message: 'error in get slide api.', success: false, error: error.message }, { status: 500 })
    }
}

export const PUT = async (request) => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'unauthorized access.', success: false }, { status: 401 })
        }
        const { id, image } = await request.json();
        const response = await DeleteFromS3(image);
        if (!response.success) {
            return NextResponse.json({ message: 'error in delete image from s3.', success: false }, { status: 500 })
        }
        const slideDocument = await Slides.findOne({});
        await slideDocument.slides.pull({ _id: id })
        await slideDocument.save();
        return NextResponse.json({ message: 'slide updated successfully.', success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error in update slide api.', success: false, error: error.message }, { status: 500 })
    }
}