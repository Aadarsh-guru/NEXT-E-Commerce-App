import Link from 'next/link';
import React from 'react'
import { BsChevronDown } from "react-icons/bs";
import Search from './Search';
import { navbarData } from '@/constants/navbarConfig';
import { usePathname } from 'next/navigation';
import Spinner from '../loaders/Spinner';

const MobileMenu = ({ setShowCatMenu, showCatMenu, setMobileMenu, categories, isFetching }) => {

    const path = usePathname();

    return (
        <div>
            <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
                <li className='flex justify-center p-[10px]' >
                    <Search />
                </li>
                {navbarData.map((item) => {
                    return (
                        <React.Fragment key={item.id}>
                            {!!item?.subMenu ? (
                                <li
                                    className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
                                    onClick={() => setShowCatMenu(!showCatMenu)}
                                >
                                    <div className="flex justify-between items-center">
                                        {item.name}
                                        <BsChevronDown size={14} />
                                    </div>
                                    {
                                        showCatMenu && (
                                            <ul className='bg-black/[0.05] -mx-5 mt-4 -mb-4 rounded-sm' >
                                                {
                                                    isFetching ?
                                                        (
                                                            <div className="h-[200px] flex justify-center items-center text-black opacity-50 text-sm" >
                                                                <Spinner />
                                                            </div>
                                                        )
                                                        :
                                                        categories?.map(category => (
                                                            <Link key={category?._id} href={`/category/${category?.slug}`} onClick={() => { setShowCatMenu(false); setMobileMenu(false) }} >
                                                                <li className={`py-4 px-8 border-t flex justify-between ${path === `/category/${category?.slug}` && 'bg-black/[0.2]'}`} >
                                                                    {category.name}
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
                            ) : (
                                <li className={`py-4 px-5 border-b rounded-md ${path === item.url && 'bg-black/[0.1]'}`}>
                                    <Link
                                        href={item?.url}
                                        onClick={() => setMobileMenu(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            )}
                        </React.Fragment>
                    );
                })}
            </ul>
        </div>
    )
}

export default MobileMenu