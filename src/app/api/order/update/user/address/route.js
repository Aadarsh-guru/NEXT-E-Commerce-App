import { NextResponse } from "next/server";
import connect from "@/config/dbConfig";
import Order from "@/models/OrderModel";
import { getServerSession } from "next-auth";
import authOptions from "@/helpers/nextAuthOptions";
import { addressChangesTemplate } from "@/helpers/EmailTemplates";
import sendMail from "@/helpers/SendMail";


export const PUT = async (request) => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'user is not logged in.', success: false }, { status: 401 })
        }
        const { orderId, firstName, lastName, email, phone, address, addressDetail, city, pincode, lanndmark } = await request.json();
        const order = await Order.findByIdAndUpdate(orderId, {
            address: {
                firstName,
                lastName,
                email,
                phone,
                address,
                addressDetail,
                city,
                pincode,
                lanndmark
            }
        }, { new: true });
        const htmlTemplate = addressChangesTemplate({ orderId, product: order.product, address: { firstName, lastName, email, phone, address, addressDetail, city, pincode, lanndmark } })
        await sendMail({
            from: process.env.NEXT_PUBLIC_ADMINISTRATOR_EMAIL,
            to: email,
            subject: 'Order Address Changed!',
            html: htmlTemplate
        })
        return NextResponse.json({ message: 'Address updated succesfully.', success: true, order }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error while calling order address api.', success: false, error }, { status: 500 })
    }
}