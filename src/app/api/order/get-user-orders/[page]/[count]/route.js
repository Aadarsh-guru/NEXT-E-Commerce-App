import connect from '@/config/dbConfig'
import authOptions from '@/helpers/nextAuthOptions';
import Order from '@/models/OrderModel';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'


export const GET = async (request, { params }) => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'user is not logged in.', success: false }, { status: 401 })
        }
        const perPage = params.count;
        const page = params.page ? params.page : 1;
        const orders = await Order.find({ userId: session.user.id }).skip((page - 1) * perPage).limit(perPage).sort({ createdAt: 'descending' })
        return NextResponse.json({ message: 'orders fetched successfully.', success: true, orders }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error while fetching all the user orders.', error, success: false }, { status: 500 })
    }
}