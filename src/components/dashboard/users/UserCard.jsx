import Image from 'next/image';
import React from 'react'
import { MdMoreHoriz } from 'react-icons/md'

const UserCard = ({ user }) => {
    return (
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-full h-[100px] flex items-center justify-between rounded-lg px-6 py-4 flex-wrap gap-4 shadow-xl">
            <div className="flex items-center gap-4">
                <div className="bg-white p-1 rounded-full">
                    <Image src={user?.image ? user.image : '/account.png'} height={50} width={50} className='rounded-full' alt="user" />
                </div>
                <div>
                    <p className='text-2xl font-bold text-white'>{user.name}</p>
                    <p className='text-lg text-gray-200'>{user.email}</p>
                </div>
            </div>
            <div className="text-3xl cursor-pointer active:scale-90 hover:text-white text-gray-200">
                <MdMoreHoriz />
            </div>
        </div>

    )
}

export default UserCard;