import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/helpers/nextAuthOptions";
import Order from "@/models/OrderModel";
import connect from "@/config/dbConfig";
import User from "@/models/UserModel";
import Product from "@/models/ProductModel";


export const GET = async () => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'unauthorized', success: false }, { status: 401 })
        }
        const today = new Date();
        const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        const dailyOrderCounts = await getOrderCounts(today, today);
        const weeklyOrderCounts = await getOrderCounts(oneWeekAgo, today);
        const monthlyOrderCounts = await getOrderCounts(oneMonthAgo, today);

        const dailyUserCounts = await getSignUpCounts(today, today);
        const weeklyUserCounts = await getSignUpCounts(oneWeekAgo, today);
        const monthlyUserCounts = await getSignUpCounts(oneMonthAgo, today);

        const dailyRevenue = await getRevenue(today, today);
        const weeklyRevenue = await getRevenue(oneWeekAgo, today);
        const monthlyRevenue = await getRevenue(oneMonthAgo, today);


        return NextResponse.json({
            message: 'Order and User counts',
            success: true,
            dailyOrderCounts,
            weeklyOrderCounts,
            monthlyOrderCounts,
            dailyUserCounts,
            weeklyUserCounts,
            monthlyUserCounts,
            dailyRevenue,
            weeklyRevenue,
            monthlyRevenue
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'error in get overview status api', success: false, error: error.message }, { status: 500 })
    }
}

async function getOrderCounts(startDate, endDate) {
    const placedCount = await Order.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate },
        status: 'placed',
    });

    const canceledCount = await Order.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate },
        status: 'canceled',
    });

    const shippedCount = await Order.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate },
        status: 'shipped',
    });

    const deliveredCount = await Order.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate },
        status: 'delivered',
    });

    return {
        startDate,
        endDate,
        placed: placedCount,
        canceled: canceledCount,
        shipped: shippedCount,
        delivered: deliveredCount,
    };
}

async function getSignUpCounts(startDate, endDate) {
    const userCount = await User.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate },
    });

    return {
        startDate,
        endDate,
        signUpCount: userCount,
    };
}

async function getRevenue(startDate, endDate) {
    const orders = await Order.find({
        createdAt: { $gte: startDate, $lte: endDate },
        status: 'placed', // Consider only placed orders
    });

    let revenue = 0;
    for (const order of orders) {
        // Assuming you have a "product" field in the order document
        const product = await Product.findById(order.product.id);
        revenue += product.price * order.product.quantity;
    }

    return {
        startDate,
        endDate,
        revenue,
    };
}