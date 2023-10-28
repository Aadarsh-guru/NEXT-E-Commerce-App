import { NextResponse } from "next/server";
import connect from "@/config/dbConfig";
import Order from "@/models/OrderModel";
import { getServerSession } from "next-auth";
import authOptions from "@/helpers/nextAuthOptions";
import { orderCancelledTemplate, orderDeliveredTemplate, orderShippedTemplate } from "@/helpers/EmailTemplates";
import sendMail from "@/helpers/SendMail";


export const PUT = async (request) => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'user is not logged in.', success: false }, { status: 401 })
        }
        const { orderId, status } = await request.json();
        const order = await Order.findByIdAndUpdate(orderId, { status: status }, { new: true });
        const templateData = { orderId: order.orderId, product: order.product, address: order.address }
        const htmlTemplate = status === 'cancelled' ? orderCancelledTemplate(templateData) : status === 'shipped' ? orderShippedTemplate(templateData) : status === 'delivered' ? orderDeliveredTemplate(templateData) : null;
        await sendMail({
            from: process.env.NEXT_PUBLIC_ADMINISTRATOR_EMAIL,
            to: order.address.email,
            subject: `Your Order ${status}!`,
            html: htmlTemplate
        })
        return NextResponse.json({ message: `Order ${status} successfully.`, success: true, order }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'error while calling order address api.', success: false, error }, { status: 500 })
    }
}