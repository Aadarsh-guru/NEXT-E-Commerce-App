import { useRouter } from 'next/navigation';
import { FaEdit } from 'react-icons/fa';
import EditAddressModel from './EditAddressModel';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';


const OrderCard = ({ order, pageKey }) => {

    const router = useRouter();
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoadinng, setIsLoading] = useState(false);
    const [status, setStatus] = useState(order.status);
    const { product, orderId, createdAt, address, paymentId } = order;

    const getStatusColor = () => {
        switch (status) {
            case 'shipped':
                return 'bg-green-500';
            case 'delivered':
                return 'bg-blue-500';
            case 'placed':
                return 'bg-yellow-500';
            case 'canceled':
                return 'bg-red-500';
            case 'returned':
                return 'bg-purple-500';
            case 'refunded':
                return 'bg-indigo-500';
            case 'failed':
                return 'bg-gray-500';
            default:
                return 'bg-yellow-500';
        }
    };

    const handleCancelOrder = async (e) => {
        if (!window.confirm('Are you sure you want to cancel this order?')) {
            return;
        }
        setIsLoading(true);
        try {
            const { data } = await axios.put(`/api/order/update/user/cancel`, { orderId: order?._id });
            setIsLoading(false)
            if (data.success) {
                toast.success(data.message);
                setStatus(data?.order.status);
                queryClient.invalidateQueries([pageKey, 'orders']);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast.error('something went wrong.')
        }
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    }

    return (
        <>
            <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8 flex flex-col md:flex-row relative">
                <div className="md:w-1/3 cursor-pointer" onClick={() => router.push(`/product/${product.id}`)}>
                    <img
                        loading="lazy"
                        src={product.image}
                        alt={product.title}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
                <div className="md:w-2/3 p-4">
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-md text-white capitalize ${getStatusColor()}`}>
                        {status}
                    </div>
                    <h2 className="text-3xl font-semibold mb-2 overflow-hidden overflow-ellipsis">{truncateText(product.title, 50)}</h2>
                    <p className="text-gray-600 mb-4 overflow-hidden overflow-ellipsis">{truncateText(product.subTitle, 75)}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="font-semibold text-xl mb-2">Order Details</p>
                            <p className="text-gray-800">Order Id: {orderId}</p>
                            <p className="text-gray-800">Payment Id: {paymentId}</p>
                            <p className="text-gray-800">Quantity: {product.quantity}</p>
                            <p className="text-gray-800 block sm:hidden">Order Date: {new Date(createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-xl mb-2 flex items-center gap-4">Shipping Address  {status === 'placed' && <FaEdit onClick={() => setIsOpen(!isOpen)} className='text-blue-500 cursor-pointer transition-transform active:scale-95' />}</p>
                            <p className="text-gray-800">
                                {address.firstName} {address.lastName}, {address.phone}, {address.addressDetail},
                                {address.address}, {address.city}, {address.pincode}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-2xl font-semibold">₹{product.price * product.quantity}</p>
                        <p className="text-gray-600 text-sm hidden sm:block">
                            {new Date(createdAt).toLocaleString()}
                        </p>
                        <button
                            onClick={handleCancelOrder}
                            disabled={(status !== 'placed' || isLoadinng) ? true : false}
                            type='button'
                            className={`px-4 py-2 ${status !== 'placed' ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500'} 
                        text-white font-semibold cursor-pointer rounded-md transition-transform hover:${status === 'placed' && 'bg-red-700'} 
                        active:${status === 'placed' && 'scale-95'}`}>
                            {
                                isLoadinng ?
                                    'Cancelling...' : status === 'placed' ? 'Cancel Order' : status
                            }
                        </button>
                    </div>
                </div>
            </div>
            <EditAddressModel pageKey={pageKey} isOpen={isOpen} setIsOpen={setIsOpen} order={order} />
        </>
    );
};

export default OrderCard;
