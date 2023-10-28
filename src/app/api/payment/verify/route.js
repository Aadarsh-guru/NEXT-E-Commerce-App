import { NextResponse } from "next/server";
import connect from "@/config/dbConfig";
import crypto from 'crypto';
import { getServerSession } from "next-auth";
import authOptions from "@/helpers/nextAuthOptions";
import Order from "@/models/OrderModel";
import sendMail from "@/helpers/SendMail";
import { adminOrderNotificationTemplate, orderPlacedTemplate } from "@/helpers/EmailTemplates";
import Product from "@/models/ProductModel";

export const POST = async (request) => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'please login to continue,', success: false, }, { status: 403 })
        }
        const { paymentId, orderId, signature, products, addressData } = await request.json();
        if (!paymentId || !orderId || !signature || !products || !addressData) {
            return NextResponse.json({ message: 'paymentId, orderId, signature, products and addressData are required.', success: false }, { status: 400 })
        }
        if (!verifyCustomSignature(orderId, paymentId, signature, process.env.RAZORPAY_KEY_SECRET)) {
            return NextResponse.json({ message: 'Payment verification failed.', success: false }, { status: 200 });
        }
        for (const product of products) {
            await Order.create({
                userId: session.user.id,
                address: addressData,
                orderId: orderId,
                paymentId: paymentId,
                product: {
                    id: product.id,
                    title: product.title,
                    subTitle: product.subTitle,
                    image: product.image,
                    price: product.price,
                    quantity: product.quantity
                },
            })
        }
        for (const product of products) {
            const productInDB = await Product.findOneAndUpdate(
                { _id: product.id, stock: { $gte: product.quantity } },
                { $inc: { stock: -product.quantity } },
            )
            if (!productInDB) {
                return NextResponse.json({ message: 'Not enough stock for one or more products.', success: false }, { status: 400 });
            }
        }
        const htmlTemplate = orderPlacedTemplate({ orderId, paymentId, products, address: addressData })
        await sendMail({
            from: process.env.NEXT_PUBLIC_ADMINISTRATOR_EMAIL,
            to: addressData?.email,
            subject: 'Order Confirmation!',
            html: htmlTemplate
        })
        await sendMail({
            from: process.env.NEXT_PUBLIC_ADMINISTRATOR_EMAIL,
            to: process.env.NEXT_PUBLIC_MAINTAINER_EMAIL || process.env.NEXT_PUBLIC_ADMINISTRATOR_EMAIL,
            subject: 'New Order Received',
            html: adminOrderNotificationTemplate({ orderId, paymentId, products, address: addressData })
        })
        return NextResponse.json({ message: 'Order placed successfully.', success: true }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error while verifying payment.', error, success: false }, { status: 500 })
    }
}

function hmac_sha256(data, key) {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(data);
    return hmac.digest('hex');
}

function verifyCustomSignature(orderId, razorpayPaymentId, signature, secret) {
    const generatedSignature = hmac_sha256(orderId + "|" + razorpayPaymentId, secret);
    return generatedSignature === signature;
}