import OrdersContainer from '@/components/dashboard/orders/OrdersConntainer'
import React from 'react'

export const metadata = {
    title: 'Admin Dashboard - Orders',
    description: 'this is the Admin Dashboard orders page',
}


const Orders = () => {
    return (
        <OrdersContainer />
    )
}

export default Orders