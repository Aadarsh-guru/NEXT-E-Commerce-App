import connect from "@/config/dbConfig";
import generateOTP from "@/helpers/GenerateOTP";
import sendMail from "@/helpers/SendMail";
import OTP from "@/models/OTPModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    await connect()
    try {
        const { email, subject } = await request.json();
        const otp = generateOTP();
        const emailBody = `
             <p>Hello!</p>
             <p>\Your verification code is: <strong>${otp}</strong></p>
             <p>Please enter this code to verify your email address.</p>
             <p>If you didn't request this verification, please ignore this email.</p>
           `;
        const currentTime = new Date();
        const expiryTime = new Date(currentTime.getTime() + 10 * 60 * 1000);
        await OTP.deleteOne({ email: email })
        await OTP.create({ email, code: otp, expiry: expiryTime })
        const data = await sendMail({
            from: process.env.NEXT_PUBLIC_ADMINISTRATOR_EMAIL,
            to: email,
            subject: subject,
            html: emailBody
        });
        if (data?.success) {
            return NextResponse.json({ message: 'OTP Sent!', success: true }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 })
    }
}