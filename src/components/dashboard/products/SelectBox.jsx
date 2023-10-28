import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { MdCheck, MdUnfoldMore } from 'react-icons/md';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function SelectBox({ setFormData, formData }) {

    const fetchCategories = async () => {
        const response = await axios.get(`/api/category`);
        return response.data;
    };

    const { data } = useQuery(['categories'], fetchCategories);

    return (
        <Listbox value={formData?.category} onChange={(selectedCategory) => setFormData({ ...formData, category: selectedCategory })}>
            <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-pointer border-2 rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{formData?.category ? formData?.category : 'Select Category'}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <MdUnfoldMore className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {data?.categories?.map((category, index) => (
                            <Listbox.Option key={index}
                                className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`}
                                value={category?.slug}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                }`}
                                        >
                                            {category?.name}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                <MdCheck className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
}

export default SelectBox;
