'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import { BsCart } from 'react-icons/bs'
import { MdPersonOutline, MdSearch, MdMenu, MdClose } from 'react-icons/md'
import NavbarMenu from './NavbarMenu';
import MobileMenu from './MobileMenu';
import Search from './Search';
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { addProductsInCart } from '@/store/slices/CartSlice';


const Header = () => {

    const path = usePathname();
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showCatMenu, setShowCatMenu] = useState(false);
    const router = useRouter();
    const session = useSession();

    const fetchWishlistProducts = async () => {
        try {
            const response = await axios.get(`/api/cart`);
            dispatch(addProductsInCart(response?.data.products));
            return response?.data.products;
        } catch (error) {
            return [];
        }
    }

    const dispatch = useDispatch();
    useQuery(['cart'], fetchWishlistProducts, { staleTime: Infinity })
    const { products } = useSelector(state => state.cart)

    const fetchCategories = async () => {
        const response = await axios.get(`/api/category`);
        return response.data;
    };

    const { data, isFetching } = useQuery(['categories'], fetchCategories, {
        staleTime: Infinity,
    });

    return (
        <div className={`w-full h-[50px] md:h-[80px]  flex items-center justify-between z-20 sticky top-0 transition-transform duration-300`}>
            <Link href='/' >
                <img loading='lazy' src={'/logo.svg'} className='w-[40px] md:w-[60px]' />
            </Link>
            <NavbarMenu setShowCatMenu={setShowCatMenu} showCatMenu={showCatMenu} categories={data?.categories} isFetching={isFetching} />
            {
                mobileMenu && <MobileMenu setMobileMenu={setMobileMenu} setShowCatMenu={setShowCatMenu} showCatMenu={showCatMenu} categories={data?.categories} isFetching={isFetching} />
            }
            <div className="flex items-center gap-2 text-black">
                <div className="hidden md:block">
                    <Search />
                </div>
                <div className="md:hidden">
                    <MdSearch onClick={() => setMobileMenu(!mobileMenu)} fontSize={18} />
                </div>
                <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                    {
                        session?.status === 'authenticated' ?
                            (
                                <Image onClick={() => router.push('/account')} width={35} height={35} className={`h-[25px] w-[25px] md:h-[35px] md:w-[35px] rounded-full border-2 ${session.data?.user?.role === 'admin' ? 'border-green-500' : session.data?.user?.role === 'seller' ? 'border-blue-400' : null} `} src={`${session?.data?.user?.image ? session?.data?.user?.image : '/account.png'}`} alt='profile-pic' />
                            )
                            :
                            (
                                <MdPersonOutline className="text-[19px] md:text-[24px] hover:text-blue-500 " onClick={() => router.push('/login')} />
                            )
                    }
                </div>
                <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                    <Link href="/cart">
                        <BsCart className={`text-[15px] md:text-[20px] ${path === '/cart' && 'text-blue-500'}`} />
                        <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                            {
                                products?.length ? products?.length : 0
                            }
                        </div>
                    </Link>
                </div>
                <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                    {mobileMenu ? (
                        <MdClose
                            className="text-[16px]"
                            onClick={() => setMobileMenu(false)}
                        />
                    ) : (
                        <MdMenu
                            className="text-[20px]"
                            onClick={() => setMobileMenu(true)}
                        />
                    )}
                </div>
            </div>
        </div >
    )
}

export default Header