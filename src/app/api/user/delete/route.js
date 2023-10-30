import connect from "@/config/dbConfig";
import User from "@/models/UserModel";
import OTP from "@/models/OTPModel";
import { NextRequest, NextResponse } from "next/server";
import DeleteFromS3 from "@/helpers/DeleteFromS3";
import authOptions from "@/helpers/nextAuthOptions";
import { getServerSession } from "next-auth";

export const POST = async (NextRequest) => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized access', success: false }, { status: 401 })
        }
        const { otp, email } = await NextRequest.json();
        const otpDoc = await OTP.findOne({ $and: [{ email: email }, { code: otp }] });
        if (!otpDoc) {
            return NextResponse.json({ message: 'invalid OTP!', success: false }, { status: 200 })
        }
        const currentTime = new Date();
        if (currentTime > otpDoc.expiry) {
            return NextResponse.json({ message: 'OTP expired!', success: false }, { status: 200 })
        }
        await OTP.findOneAndDelete(otpDoc._id)
        const user = await User.findOne({ email: email })
        if (user.image) {
            const { success } = await DeleteFromS3(user.image)
            if (!success) {
                return NextResponse.json({ message: 'something went wrong.!', success: false }, { status: 200 })
            }
        }
        await User.findOneAndDelete({ email: email })
        return NextResponse.json({ message: 'User Deleted Successfully', success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}