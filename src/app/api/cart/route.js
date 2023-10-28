import connect from '@/config/dbConfig';
import authOptions from '@/helpers/nextAuthOptions';
import Cart from '@/models/CartModel';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'

export const POST = async (request) => {
    await connect();
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ message: 'please login to continue,', success: false, }, { status: 403 })
        }
        const cartDocument = await Cart.findOne({ userId: session?.user.id });
        const { title, image, price, quantity, id, subTitle } = await request.json();
        if (cartDocument) {
            const isProductInCart = cartDocument.products.some((product) => product.id.toString() === id.toString());
            if (isProductInCart) {
                cartDocument.products.pull({ id: id });
                await cartDocument.save();
                return NextResponse.json({ message: 'product removed from cart.', success: true }, { status: 200 });
            } else {
                cartDocument.products.push({ title, image, price, quantity, id, subTitle });
                await cartDocument.save();
                return NextResponse.json({ message: 'product added in cart.', success: true }, { status: 200 });
            }
        } else {
            await Cart.create({ userId: session?.user.id, products: [{ title, image, price, quantity, id, subTitle }] })
            return NextResponse.json({ message: 'product added in cart.', success: true }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error, message: 'error while adding product in cart.', success: false }, { status: 500 });
    }
}


export const GET = async (request) => {
    await connect();
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ message: 'please login to continue,', success: false, }, { status: 403 })
        }
        const cartDocument = await Cart.findOne({ userId: session?.user.id });
        if (cartDocument) {
            return NextResponse.json({ message: 'cart products fetched successfully.', products: cartDocument.products, success: true }, { status: 200 });
        } else {
            return NextResponse.json({ message: `No cart products found for this user`, products: [], success: false }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error, message: 'error while fetching cart products.', success: false }, { status: 500 });
    }
}


export const DELETE = async (request) => {
    await connect();
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ message: 'please login to continue,', success: false, }, { status: 403 })
        }
        await Cart.updateOne({ userId: session?.user.id }, { products: [] });
        return NextResponse.json({ message: `Cart is Empty now`, success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error, message: 'error while making cart empty.', success: false }, { status: 500 });
    }
}