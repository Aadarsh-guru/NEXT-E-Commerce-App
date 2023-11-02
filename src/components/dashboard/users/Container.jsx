'use client'
import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Spinner from '@/components/loaders/Spinner'
import toast from 'react-hot-toast'

const Container = ({ role }) => {

    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([])
    const [hasMore, setHasMore] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`/api/user/get-users/${role}/${page}/${12}`);
            const { success, message, users } = response.data;
            if (success) {
                if (users.length === 0 || users.length < 12) {
                    setHasMore(false);
                }
                return users;
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

    const { data = [], isLoading, isFetching } = useQuery([role, page], fetchUsers, {
        keepPreviousData: true,
        staleTime: Infinity
    });

    useEffect(() => {
        if (data) {
            setUsers([...users, ...data])
        }
    }, [data])

    return (
        <div className="w-full h-[calc(100%-60px)] flex flex-col justify-start items-center p-4 gap-4 overflow-y-auto ">
            {
                users?.length !== 0 && <h1 className="text-xl font-bold text-gray-500">Showing {users?.length} {role}.</h1>
            }
            {
                isLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <Spinner />
                    </div>
                )
                    :
                    (
                        <>
                            {
                                users?.length === 0 ?
                                    <div className="w-full h-full flex justify-center items-center">
                                        <p className="text-lg">No {role} found.</p>
                                    </div>
                                    :
                                    users?.map((user, index) => (
                                        <UserCard key={index} user={user} />
                                    ))
                            }
                        </>
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
    )
}

export default Container