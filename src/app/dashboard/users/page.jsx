import Container from '@/components/dashboard/users/Container';
import RefreshButton from '@/components/dashboard/users/RefreshButton';
import React from 'react'

export const metadata = {
    title: 'Admin Dashboard - Users',
    description: 'this is the Admin Dashboard users page',
}


const Users = () => {

    return (
        <div className="w-full h-full">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-full py-4 flex items-center justify-between px-6 rounded-t-lg">
                <h4 className='text-2xl font-bold text-white'>All Users</h4>
                <div className="flex items-center">
                    <RefreshButton query='user' />
                </div>
            </div>
            <Container role={'user'} />
        </div>
    )
}

export default Users