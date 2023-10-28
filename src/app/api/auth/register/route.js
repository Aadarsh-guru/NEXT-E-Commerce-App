import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import OTP from "@/models/OTPModel";

export const POST = async (NextRequest) => {
    try {
        const { name, email, password, otp } = await NextRequest.json();
        const alreadyExist = await User.findOne({ email: email })
        if (alreadyExist) {
            return NextResponse.json({ message: 'User already registered.', success: false }, { status: 200 })
        }
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
        await User.create({ name, email, password: hashedPassword, role: 'user' })
        return NextResponse.json({ message: 'User registered successfully.', success: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}