import { NextResponse } from "next/server";
import connect from "@/config/dbConfig";
import Product from "@/models/ProductModel";

export const GET = async (request) => {
    await connect();
    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || 1;
        const count = searchParams.get('quantity') || 12;
        const search = searchParams.get('query') || '';
        const sort = searchParams.get('sort');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const skip = (page - 1) * count;
        const query = {};
        const sortQuery = {};
        if (sort) {
            sortQuery.price = sort;
        } else {
            sortQuery.createdAt = 'descending';
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
        if (minPrice && maxPrice) {
            query.price = { $gte: minPrice, $lte: maxPrice };
        } else if (minPrice) {
            query.price = { $gte: minPrice };
        } else if (maxPrice) {
            query.price = { $lte: maxPrice };
        }
        const products = await Product.find(query).skip(skip).limit(count).sort(sortQuery);
        return NextResponse.json({ message: 'search products fetched successfully.', products, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message, message: 'error in search products api.', success: false }, { status: 500 })
    }
}