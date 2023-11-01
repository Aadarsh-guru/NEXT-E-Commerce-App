import OverviewContainer from '@/components/dashboard/overview/OverviewContainer'
import React from 'react'

export const metadata = {
    title: 'Admin Dashboard - Overview',
    description: 'this is the Admin Dashboard page',
}

const Dashboard = () => {
    return (
        <div className="w-full h-full">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-full py-4 flex items-center justify-center px-6 rounded-t-lg">
                <h4 className='text-2xl font-bold text-white'>Your Site Overview</h4>
            </div>
            <OverviewContainer />
        </div>
    )
}

export default Dashboard