import connect from '@/config/dbConfig'
import Product from '@/models/ProductModel';
import { NextResponse } from 'next/server'


export const GET = async (request, { params }) => {
    await connect();
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const search = searchParams.get("search");
        const perPage = params.count;
        const page = params.page ? params.page : 1;
        const query = {};
        if (category !== null) {
            query.category = category;
        }
        if (search !== null) {
            const searchQuery = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                    { subTitle: { $regex: search, $options: 'i' } },
                ]
            };
            if (query.$and) {
                query.$and.push(searchQuery);
            } else {
                query.$and = [searchQuery];
            }
        }
        const products = await Product.find(query).skip((page - 1) * perPage).limit(perPage).sort({ createdAt: 'descending' });
        return NextResponse.json({ message: 'Products fetched successfully.', success: true, products }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error while fetching products.', error, success: false }, { status: 500 });
    }
};
