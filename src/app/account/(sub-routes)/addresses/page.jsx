import AddressContainer from '@/components/account/address/AddressContainer'
import React from 'react'

export const metadata = {
    title: `Your Address - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: 'this is the address page',
}

const Addresses = () => {
    return (
        <AddressContainer />
    )
}

export default Addresses