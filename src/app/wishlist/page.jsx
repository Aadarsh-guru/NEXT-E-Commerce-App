import WishlistContainer from '@/components/wishlist/WishlistContainer'
import React from 'react'

export const metadata = {
    title: `Your Wishlist - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: 'this is the wishlist page',
}

const Wishlist = () => {
    return (
        <WishlistContainer />
    )
}

export default Wishlist