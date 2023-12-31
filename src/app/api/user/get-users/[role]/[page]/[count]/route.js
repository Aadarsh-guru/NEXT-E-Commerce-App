import connect from '@/config/dbConfig'
import authOptions from '@/helpers/nextAuthOptions';
import User from '@/models/UserModel'
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'

export const GET = async (request, { params }) => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized access', success: false }, { status: 401 })
        }
        const perPage = params.count;
        const page = params.page ? params.page : 1;
        const users = await User.find({ role: params?.role }).skip((page - 1) * perPage).limit(perPage).sort({ createdAt: 'descending' }).select('-password')
        return NextResponse.json({ message: 'users fetch successfully.', users, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error, message: 'error while getting all users.', success: false }, { status: 500 })
    }
}