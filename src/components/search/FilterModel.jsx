import { priceFilter } from '@/constants/filterConfig';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

const FilterModel = ({ isOpen, setIsOpen, handleSort, sort, filter, handleFilter, clearFilters }) => {

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog open={isOpen} as="div" className="relative z-10" onClose={() => setIsOpen(!isOpen)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md max-h-full transform overflow-hidden rounded-2xl bg-[#f2f2f2] p-6 text-left align-middle shadow-xl transition-all ">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-center text-gray-900">
                                    Filter and Sort Products
                                </Dialog.Title>

                                {/* Sort Section */}
                                <div className="mt-4 flex flex-col items-center gap-2 md:gap-4">
                                    <h4 className="text-sm font-medium text-gray-600">Sort by Price</h4>
                                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-2">
                                        <button
                                            onClick={() => { handleSort('asc'); setIsOpen(!isOpen) }}
                                            className={`${sort === 'asc' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                                                } px-3 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all`}
                                        >
                                            Low to High
                                        </button>
                                        <button
                                            onClick={() => { handleSort('desc'); setIsOpen(!isOpen) }}
                                            className={`${sort === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                                                } px-3 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all`}
                                        >
                                            High to Low
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full bg-black/25 h-[1px] mt-4"></div>

                                {/* filter section */}
                                <div className="mt-4 flex flex-col items-center gap-2 md:gap-4">
                                    <h4 className="text-sm font-medium text-gray-600">Filter by Price</h4>
                                    <div className="w-full flex flex-col justify-center items-center gap-2">
                                        {priceFilter.map((value, index) => (
                                            <button
                                                key={index}
                                                onClick={() => { handleFilter(value); setIsOpen(!isOpen) }}
                                                className={`w-[90%] border-[1px] px-4 py-2 rounded-lg border-black 
                                                ${(filter.minPrice === value.minValue && filter.maxPrice === value.maxValue) ? 'bg-blue-500 text-white' : ''}
                                                 hover:bg-blue-500 hover:text-white hover:border-white transition-transform active:scale-[99%]`}
                                            >
                                                {`${value.minValue} - ${value.maxValue}`}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="w-full flex flex-wrap md:flex-nowrap justify-evenly gap-2 md:gap-4 px-4">
                                        <button
                                            onClick={() => { clearFilters(); setIsOpen(!isOpen) }}
                                            className='bg-gray-300 w-full text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition-transform active:scale-95'
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default FilterModel;

