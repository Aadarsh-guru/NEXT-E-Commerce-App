import SingleContainer from '@/components/checkout/SingleCheckout.jsx'
import React from 'react'

export const metadata = {
    title: `Checkout - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: 'this is the checkout page',
}

const Checkout = ({ params }) => {
    return (
        <div>
            <SingleContainer productId={params?.id} quantity={params?.quantity} />
        </div>
    )
}

export default Checkout