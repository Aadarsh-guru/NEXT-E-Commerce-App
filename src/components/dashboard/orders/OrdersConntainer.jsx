'use client'
import Spinner from '@/components/loaders/Spinner';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import toast from 'react-hot-toast';
import { MdKeyboardArrowDown } from 'react-icons/md';
import DashboardOrderCard from './DashboardOrderCard';

const OrdersContainer = () => {

    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [tab, setTab] = useState('placed');

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

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`/api/order/get-admin-orders/${page}/${12}/${tab}`);
            const { success, message, orders } = response.data;
            if (success) {
                if (orders.length === 0 || orders.length < 12) {
                    setHasMore(false);
                }
                return orders;
            } else {
                toast.error(message);
                return [];
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
            console.error(error);
            return [];
        }
    };

    const { data = [], isLoading, isFetching } = useQuery([page, tab], fetchOrders, {
        keepPreviousData: true,
        staleTime: Infinity
    });

    useEffect(() => {
        if (data) {
            setOrders([...orders, ...data])
        }
    }, [data])


    const handleTabChange = (tabName) => {
        setTab(tabName);
        setPage(1)
        setOrders([]);
        queryClient.invalidateQueries([page, tab])
    }

    return (
        <div className="w-full h-full">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-full py-4 flex items-center justify-between px-6 rounded-t-lg">
                <h4 className='text-2xl font-bold text-white capitalize'>{tab} Orders</h4>
                {/* menu started */}
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 capitalize">
                            {tab}
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
                                            onClick={() => handleTabChange(item.name)}
                                            className={`w-full text-left px-4 py-3 text-sm capitalize hover:bg-blue-500 hover:text-white ${tab === item.name ? 'bg-blue-500 text-white' : ''}  rounded-md`}
                                        >
                                            {item.name}
                                        </button>
                                    </Menu.Item>
                                ))
                            }
                        </Menu.Items>
                    </Transition>
                </Menu>
                {/* menu ended  */}
            </div>
            <div className="w-full h-[calc(100vh-60px)] flex flex-col justify-start items-center p-4 gap-4 overflow-y-auto">
                {
                    isLoading ?
                        (
                            <div className="w-full h-full flex justify-center items-center">
                                <Spinner />
                            </div>
                        )
                        :
                        orders?.length === 0 ?
                            (
                                <div className="w-full h-full flex justify-center items-center">
                                    <h1 className="text-2xl font-bold text-gray-800">No Orders Found.</h1>
                                </div>
                            )
                            :
                            (
                                <div className="gap-5 my-10">
                                    {
                                        orders?.map((order, index) => (
                                            <DashboardOrderCard order={order} key={index} page={page} tab={tab} queryClient={queryClient} setOrders={setOrders} />
                                        ))
                                    }
                                </div>
                            )
                }
                {
                    (hasMore && !isLoading) && (
                        <div className="w-full h-[100px] flex justify-center items-center">
                            {(isFetching && !isLoading) ? (
                                <Spinner />
                            ) : (
                                <button
                                    onClick={() => setPage(page + 1)}
                                    className="bg-gray-100 shadow-md  transition-transform text-xl hover:shadow-lg hover:bg-gray-200  active:scale-95 text-black/[0.5] py-3 px-6 rounded-lg duration-300 ease-in-out"
                                >
                                    Load More
                                </button>
                            )}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default OrdersContainer;