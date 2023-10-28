import CheckoutContainer from '@/components/checkout/CheckoutContainer'
import React from 'react'

export const metadata = {
    title: `Checkout - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: 'this is the checkout page',
}

const Checkout = () => {

    return (
        <div>
            <CheckoutContainer />
        </div>
    )
}

export default Checkout