'use client'
import React from 'react'
import { MdRefresh } from 'react-icons/md'
import { useQueryClient } from '@tanstack/react-query'

const RefreshButton = ({ query }) => {

    const queryClient = useQueryClient()

    const refresh = () => {
        queryClient.invalidateQueries([query])
    }

    return (
        <button className="bg-white text-gray-600 rounded-full p-2 hover:bg-gray-200">
            <MdRefresh onClick={refresh} />
        </button>
    )
}

export default RefreshButton