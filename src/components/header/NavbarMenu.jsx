import { navbarData } from '@/constants/navbarConfig';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { BsChevronDown } from "react-icons/bs";
import Spinner from '../loaders/Spinner';

const NavbarMenu = ({ setShowCatMenu, showCatMenu, categories, isFetching }) => {

    const path = usePathname();

    return (
        <div>
            <ul className="hidden md:flex items-center gap-8 font-medium text-black" >
                {
                    navbarData.map(item => (
                        <React.Fragment key={item?.id}>
                            {
                                !!item?.subMenu ?
                                    (
                                        <li
                                            className='cursor-pointer flex items-center gap-2 relative  '
                                            onMouseEnter={() => setShowCatMenu(true)}
                                            onMouseLeave={() => setShowCatMenu(false)}
                                        >
                                            {item?.name}
                                            <BsChevronDown size={14} />
                                            {
                                                showCatMenu && (
                                                    <ul
                                                        className='bg-[#fff] absolute top-6 left-0 max-h-[300px] overflow-y-auto min-w-[250px] px-1 py-1 text-black shadow-lg rounded-md'
                                                    >
                                                        {
                                                            isFetching ?
                                                                (
                                                                    <div className="h-[200px] flex justify-center items-center text-black opacity-50 text-sm" >
                                                                        <Spinner />
                                                                    </div>
                                                                )
                                                                :
                                                                categories?.map(category => (
                                                                    <Link key={category?._id} href={`/category/${category?.slug}`} onClick={() => setShowCatMenu(false)} >
                                                                        <li className={`h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md ${path === `/category/${category?.slug}` && 'bg-black/[0.03]'}`} >
                                                                            {category?.name}
                                                                            <span className="opacity-50 text-sm" >
                                                                                {
                                                                                    category?.products ?
                                                                                        (
                                                                                            category?.products?.length
                                                                                        )
                                                                                        :
                                                                                        '0'
                                                                                }
                                                                            </span>
                                                                        </li>
                                                                    </Link>
                                                                ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </li>
                                    )
                                    :
                                    (
                                        <li className={`cursor-pointer px-3 py-1 hover:bg-black/[0.05] rounded-md ${path === item.url && 'bg-black/[0.05]'}`} >
                                            <Link href={item.url} >
                                                {item.name}
                                            </Link>
                                        </li>
                                    )
                            }
                        </React.Fragment>
                    ))
                }
            </ul>
        </div>
    )
}

export default NavbarMenu