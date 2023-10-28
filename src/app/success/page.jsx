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
                <div className="text-base mt-5">
                    For any product related query, drop an email to
                </div>
                <div className="underline">aadarshgurug@gmail.com</div>

                <Link href="/" className="font-bold mt-5 hover:text-black/[0.7] transition-transform active:scale-[98%]">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default Success;