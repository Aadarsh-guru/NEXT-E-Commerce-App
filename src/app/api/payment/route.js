import { NextResponse } from "next/server";
import connect from "@/config/dbConfig";
import Razorpay from "razorpay";
import { getServerSession } from "next-auth";
import authOptions from "@/helpers/nextAuthOptions";

const instence = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const POST = async (request) => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'unauthorized', success: false }, { status: 401 });
        }
        const { amount } = await request.json();
        if (!amount) {
            return NextResponse.json({ message: 'amount is required.', success: false }, { status: 400 })
        }
        const order = await instence.orders.create({
            amount: amount * 100,
            currency: 'INR'
        });
        return NextResponse.json({ message: 'order created successfully', success: true, order }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: 'Error while creating order', error, success: false }, { status: 500 })
    }
}
