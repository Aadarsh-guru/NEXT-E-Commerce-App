import connect from '@/config/dbConfig';
import authOptions from '@/helpers/nextAuthOptions';
import Wishlist from '@/models/WishlistModel';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'

export const POST = async (request) => {
    await connect();
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ message: 'please login to continue,', success: false, }, { status: 403 })
        }
        const { title, image, price, discount, id } = await request.json();
        const wishlistDocument = await Wishlist.findOne({ userId: session?.user.id });
        if (wishlistDocument) {
            const isProductInWishlist = wishlistDocument.products.some((product) => product.id.toString() === id.toString());
            if (isProductInWishlist) {
                wishlistDocument.products.pull({ id: id });
                await wishlistDocument.save();
                return NextResponse.json({ message: 'product removed from wishlist.', success: true }, { status: 200 });
            } else {
                wishlistDocument.products.push({ id, title, image, price, discount });
                await wishlistDocument.save();
                return NextResponse.json({ message: 'product added in wishlist.', success: true }, { status: 200 });
            }
        } else {
            await Wishlist.create({ userId: session?.user.id, products: [{ id, title, image, price, discount }] })
            return NextResponse.json({ message: 'product added in wishlist.', success: true }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error, message: 'error while adding product in wishlist.', success: false }, { status: 500 });
    }
}


export const GET = async (request) => {
    await connect();
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ message: 'please login to continue,', success: false, }, { status: 403 })
        }
        const wishlistDocument = await Wishlist.findOne({ userId: session?.user.id });
        if (wishlistDocument) {
            return NextResponse.json({ message: 'wishlist products fetched successfully.', products: wishlistDocument.products, success: true }, { status: 200 });
        } else {
            return NextResponse.json({ message: `No wishlist products found for this user`, products: [], success: false }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error, message: 'error while fetching wishlist products.', success: false }, { status: 500 });
    }
}