import React from 'react'
import Cartcontainer from '@/components/cart/Cartcontainer'

export const metadata = {
    title: `Cart - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: 'this is the cart page',
}

const Cart = () => {
    return (
        <div className="w-full md:py-20">
            {/* Heading Starts here */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                    Shopping Cart
                </div>
            </div>
            {/* Heading Ends here */}
            <Cartcontainer />
        </div>
    )
}

export default Cart