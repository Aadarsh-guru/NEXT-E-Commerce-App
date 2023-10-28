import OrdersContainer from '@/components/account/orders/OrdersContainer'

export const metadata = {
    title: `Orders - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: 'this is the Orders page',
}

const Orders = () => {
    return (
        <OrdersContainer />
    )
}

export default Orders