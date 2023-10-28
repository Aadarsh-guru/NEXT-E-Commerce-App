import Container from '@/components/dashboard/users/Container';
import RefreshButton from '@/components/dashboard/users/RefreshButton';
import React from 'react'

export const metadata = {
    title: 'Admin Dashboard - Admins',
    description: 'this is the Admin Dashboard admins page',
}


const Admins = () => {

    return (
        <div className="w-full h-full">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-full py-4 flex items-center justify-between px-6 rounded-t-lg">
                <h4 className='text-2xl font-bold text-white'>All Admins</h4>
                <div className="flex items-center">
                    <RefreshButton query='admin' />
                </div>
            </div>
            <Container role={'admin'} />
        </div>
    )
}

export default Admins