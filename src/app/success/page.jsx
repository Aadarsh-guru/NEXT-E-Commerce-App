import React from "react";
import Link from "next/link";

export const metadata = {
    title: `Success - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: 'this is the success page',
}


const Success = () => {
    return (
        <div className="min-h-[650px] flex items-center">
            <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
                <div className="text-2xl font-bold">
                    Thanks for shopping with us!
                </div>
                <div className="text-lg font-bold mt-2">
                    Your order has been placed successfully.
                </div>
                <Link href="/" className="font-bold mt-2 text-center hover:text-black/75 transition-transform active:scale-[98%] border-[1px] border-black/50 py-2 px-4 rounded-md">
                    Continue Shopping
                </Link>
                <Link href={'/account/orders'} className="font-bold mt-2 bg-black text-white text-center hover:bg-black/75 transition-transform active:scale-[98%] border-[1px] border-black/50 py-2 px-4 rounded-md" >
                    Your Orders
                </Link>
            </div>
        </div>
    );
};

export default Success;
