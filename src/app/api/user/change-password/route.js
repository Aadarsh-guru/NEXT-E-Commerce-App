import connect from "@/config/dbConfig";
import User from "@/models/UserModel";
import bcrypt from 'bcrypt'
import OTP from "@/models/OTPModel";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (NextRequest) => {
    await connect();
    try {
        const { otp, email, password } = await NextRequest.json();
        const otpDoc = await OTP.findOne({ $and: [{ email: email }, { code: otp }] });
        if (!otpDoc) {
            return NextResponse.json({ message: 'invalid OTP!', success: false }, { status: 200 })
        }
        const currentTime = new Date();
        if (currentTime > otpDoc.expiry) {
            return NextResponse.json({ message: 'OTP expired!', success: false }, { status: 200 })
        }
        await OTP.findOneAndDelete(otpDoc._id)
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.findOneAndUpdate({ email: email }, { password: hashedPassword })
        return NextResponse.json({ message: 'Password changed successfully.', success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}