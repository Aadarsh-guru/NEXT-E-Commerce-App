import { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

const DashboardOrderCard = ({ order, setOrders }) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { product, orderId, createdAt, address, paymentId, status } = order;
    const [action, setAction] = useState(status);

    const options = [
        {
            name: 'placed',
            id: 1
        },
        {
            name: 'shipped',
            id: 2,
        },
        {
            name: 'delivered',
            id: 3
        },
        {
            name: 'canceled',
            id: 4
        }
    ]


    const handleChangeOrderStatus = async (e) => {
        try {
            setLoading(true)
            const { data } = await axios.put(`/api/order/update/status`, {
                status: action,
                orderId: order?._id
            })
            setLoading(false);
            if (data?.success) {
                toast.success(data?.message);
                setAction(data?.order.status);
                setOrders(orders => orders.filter(o => o._id !== order._id))
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error('something wne wrong.')
        }
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8 flex flex-col md:flex-row mb-4">
            <div className="md:w-1/3 cursor-pointer" onClick={() => router.push(`/product/${product.id}`)} >
                <img
                    loading="lazy"
                    src={product.image}
                    alt={product.title}
                    className="w-full h-auto object-cover rounded-lg"
                />
            </div>
            <div className="md:w-2/3 p-4">
                <h2 className="text-3xl font-semibold mb-2 overflow-hidden overflow-ellipsis">{truncateText(product.title, 30)}</h2>
                <p className="text-gray-600 mb-4 overflow-hidden overflow-ellipsis">{truncateText(product.subTitle, 50)}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="font-semibold text-xl mb-2">Order Details</p>
                        <p className="text-gray-800">Order Id: {orderId}</p>
                        <p className="text-gray-800">Payment Id: {paymentId}</p>
                        <p className="text-gray-800">Quantity: {product.quantity}</p>
                        <p className="text-gray-800 block sm:hidden">Order Date: {new Date(createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-xl mb-2">Shipping Address</p>
                        <p className="text-gray-800 break-words ">
                            {address.firstName} {address.lastName}, {address.phone}, {address.addressDetail},
                            {address.address}, {address.city}, {address.pincode}
                        </p>
                        <p className="text-gray-800 break-words">{address.email}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-2xl font-semibold">₹{product.price * product.quantity}</p>
                    <p className="text-gray-600 text-sm hidden sm:block">
                        {new Date(createdAt).toLocaleString()}
                    </p>
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button disabled={status === 'delivered' || status === 'canceled'} className="inline-flex w-full justify-center rounded-md  bg-opacity-80 bg-black px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 capitalize disabled:cursor-not-allowed">
                                {action}
                                <MdKeyboardArrowDown
                                    className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-56 p-1 gap-1 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 my focus:outline-none">
                                {
                                    options.map(item => (
                                        <Menu.Item key={item.id}>
                                            <button
                                                onClick={() => setAction(item.name)}
                                                className={`w-full text-left px-4 py-3 text-sm capitalize hover:bg-blue-500 hover:text-white ${action === item.name ? 'bg-blue-500 text-white' : ''}  rounded-md ${status === 'shipped' && item.name === 'placed' ? 'hidden' : ''}`}
                                            >
                                                {item.name}
                                            </button>
                                        </Menu.Item>
                                    ))
                                }
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <button
                        className='px-4 py-2 bg-blue-500 text-white rounded-md capitalize hover:bg-blue-600 disabled:bg-blue-300 disabled:text-gray-200 disabled:cursor-not-allowed transition-transform active:scale-95'
                        disabled={status === 'delivered' || status === 'canceled'}
                        onClick={handleChangeOrderStatus}
                    >
                        {
                            loading ?
                                <div className="inline-block w-4 h-4 border-t-2 border-r-2 border-b-2 border-white rounded-full animate-spin mt-1"></div>
                                :
                                'Save'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardOrderCard;
