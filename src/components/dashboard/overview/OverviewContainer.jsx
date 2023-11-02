'use client'
import React from 'react'
import OrderCounts from './OrderCounts'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Spinner from '@/components/loaders/Spinner'
import UserCounts from './UserCounts'
import RevenueCounts from './RevenuCounts'

const OverviewContainer = () => {

    const { data, isLoading } = useQuery(['order-counts'], async () => {
        const response = await axios.get(`/api/overview`)
        console.log(response.data);
        return response.data;
    }, { staleTime: Infinity })

    return (
        <div className="w-full min-h-[calc(100vh-60px)] flex flex-col p-4 gap-4">
            {
                isLoading ? (
                    <div className="min-h-[calc(100vh-60px)] w-full flex justify-center items-center">
                        <Spinner />
                    </div>
                )
                    :
                    (
                        <>
                            <OrderCounts dailyCounts={data?.dailyOrderCounts} weeklyCounts={data?.weeklyOrderCounts} monthlyCounts={data?.monthlyOrderCounts} />
                            <UserCounts dailyUserCounts={data?.dailyUserCounts} weeklyUserCounts={data?.weeklyUserCounts} monthlyUserCounts={data?.monthlyUserCounts} />
                            <RevenueCounts dailyRevenue={data?.dailyRevenue} weeklyRevenue={data?.weeklyRevenue} monthlyRevenue={data?.monthlyRevenue} />
                        </>
                    )
            }
        </div>
    )
}

export default OverviewContainer