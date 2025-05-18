import React from 'react'
import CardSkeleton from './Skeleton/CardSkeleton';
import Card from './Card';

const SearchList = ({ data, loading, searchText }) => {
    const SearchData = data?.filter(item => {
        return Object.keys(item).some(key => 
            item[key]?.toString().toLowerCase().includes(searchText.toString().toLocaleLowerCase())
        );
    });

    return (
        <div className='searchList'>
            {
                searchText === '' ? (
                    <div className='w-full h-screen flexCenter gap-5'>
                        <div className='p-2 flexCenter bg-white rounded-full'>
                            <img src='/icons/search.svg' alt='search' className='size-10 max-md:size-7' />
                        </div>
                        <p className='text-4xl max-md:text-2xl font-bold'>Search for users</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-5'>
                        {
                            SearchData.map((user, index) => (
                                <>
                                    {
                                        loading ? <CardSkeleton key={index} /> : <Card user={user} current={false} key={index} />
                                    }
                                </>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default SearchList