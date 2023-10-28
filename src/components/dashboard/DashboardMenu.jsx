'use client'
import { AdminDashboardData } from '@/constants/dashboardConfig';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const DashboardMenu = () => {

    const path = usePathname()

    return (
        <div className="h-full w-full border-r-[1px] ">
            {/* header */}
            <div className="w-full h-[60px] flex justify-center items-center border-b-[1px] border-t-[1px] border-l-[1px]">
                <h2 className='text-xl font-bold text-blue-600 text-center' >Admin Dashboard</h2>
            </div>
            {/* menu */}
            <div className="w-full h-[calc(100vh-60px)] flex flex-col overflow-scroll">
                {
                    AdminDashboardData?.map((item, index) =>
                        <Link className={`w-full h-[60px] flex items-center justify-center gap-4 hover:bg-gray-400 border-b-[1px] border-l-[1px] ${path === item.url && 'bg-gray-400'}`} href={item.url} key={index}>
                            <div className="w-[25%] flex justify-center items-center">
                                <item.icon />
                            </div>
                            <div className="w-[75%] flex justify-start items-center">
                                {item.title}
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}

export default DashboardMenu