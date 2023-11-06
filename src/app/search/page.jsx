import SearchCotainer from '@/components/search/SearchContainer';
import React from 'react'

export async function generateMetadata({ searchParams }) {
    return {
        title: searchParams?.query ? `${searchParams.query + ' - ' + process.env.NEXT_PUBLIC_APP_NAME}` : `Search page - ${process.env.NEXT_PUBLIC_APP_NAME}`,
        description: searchParams?.query || `this the search page`,
        keywords: searchParams?.query || `this the search page`
    };
}

const SearchPage = ({ searchParams }) => {

    return (
        <div className="w-full">
            <SearchCotainer searchValue={searchParams?.query} />
        </div>
    )
}

export default SearchPage