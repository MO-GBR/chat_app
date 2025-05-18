import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_USERS } from '../Lib/GraphQL/Queries'
import SearchList from '../Components/SearchList'

const Search = () => {
    const [ search, setSearch ] = useState("");

    const { data, loading } = useQuery(GET_ALL_USERS);
    return (
        <div className='w-full min-h-screen flexCenter flex-col'>
            <div className='search'>
                <img src='/icons/search.svg' />
                <input type='text' placeholder='Search ...' value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <>
                <SearchList data={data?.getAllUsers} loading={loading} searchText={search} />
            </>
        </div>
    )
}

export default Search