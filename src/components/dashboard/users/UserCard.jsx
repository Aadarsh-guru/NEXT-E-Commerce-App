import Image from 'next/image';

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
            <div>
                <p className='text-sm text-green-600 font-bold border-2 border-green-500 px-2 py-1 rounded-lg capitalize' >{user?.role}</p>
            </div>
        </div>

    )
}

export default UserCard;