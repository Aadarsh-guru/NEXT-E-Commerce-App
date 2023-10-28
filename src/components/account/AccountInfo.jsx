'use client'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Loader from '../loaders/Loader'
import Image from 'next/image'
import { userAccountData, adminAccountData } from '@/constants/accountConfig'
import Card from './Card'

const AccountInfo = () => {

    const { data, status } = useSession()
    const [loading, setLoading] = useState(false)

    return (
        <>
            {
                (status === 'loading' || loading) ?
                    (
                        <Loader />
                    )
                    :
                    (
                        <div className="w-full md:py-10">
                            <div className="text-center m--w-[800px] mx-auto mt-8 md:mt-0">
                                <div className="leading-4 md:leading-5 mb-5 flex flex-col gap-5 items-center">
                                    <Image height={200} className='rounded-full h-[100px] md:h-[150px] w-[100px] md:w-[150px]' width={200} src={data?.user.image ? data.user.image : '/account.png'} />
                                    <span className='capitalize text-xs text-black/[0.75]' >Role : {data?.user?.role}</span>
                                    <span className='font-semibold text-[20px] md:text-[28px] capitalize  text-black/[0.75] ' >Hey! {data?.user.name}</span>
                                    <span className='font-semibold text-[14px] md:text-[18px]  text-black/[0.5] ' >{data?.user.email}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
                                {
                                    (data?.user?.role === 'admin' ? adminAccountData : userAccountData).map(item => (
                                        <Card email={data?.user.email} setLoading={setLoading} key={item.id} item={item} />
                                    ))
                                }
                            </div>
                        </div>
                    )
            }
        </>
    )
}


export default AccountInfo