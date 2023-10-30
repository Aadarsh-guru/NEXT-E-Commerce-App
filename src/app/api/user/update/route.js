import connect from "@/config/dbConfig";
import DeleteFromS3 from "@/helpers/DeleteFromS3";
import authOptions from "@/helpers/nextAuthOptions";
import User from "@/models/UserModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (NextRequest) => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized access', success: false }, { status: 401 })
        }
        const { name, email, image } = await NextRequest.json();
        const user = await User.findOne({ email: email })
        if (name) {
            user.name = name;
        }
        if (image && user.image) {
            const { success } = await DeleteFromS3(user.image)
            if (!success) {
                return NextResponse.json({ message: 'something went wrong.!', success: false }, { status: 200 })
            }
        }
        if (image) {
            user.image = image;
        }
        await user.save();
        return NextResponse.json({ message: 'User info updated successfully.', success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}




export const PATCH = async (NextRequest) => {
    await connect();
    try {
        const { email } = await NextRequest.json();
        await User.findOneAndUpdate({ email: email }, { role: 'admin' })
        return NextResponse.json({ message: 'You are seller now.', success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}