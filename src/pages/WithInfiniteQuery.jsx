import React from 'react'
import { useQuery, useQueries, keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react';
const getPosts = async (page) => {
    console.log(page);
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page.pageParam}`);
    if (!res.ok) {
        throw new Error('There was an error!')
    }
    return res.json();
}

const WithQuery = () => {
    const { ref, inView } = useInView()
    const { isPending, error, data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        staleTime: 10000,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 0 ? null : allPages.length + 1
        }
    })

    useEffect(() => {
        if (inView) fetchNextPage();
    }, [inView])
    const posts = data ? data.pages.flatMap(page => page) : []

    if (isPending) {
        return <h1 className='text-3xl text-center my-8 font-bold text-gray-400'>Loading...</h1>;
    }

    if (error) {
        return <h1 className='text-3xl text-center my-8 font-bold text-gray-400'>Error: {error.message}</h1>;
    }

    return (
        <div className='m-4 max-w-[600px] w-4/5 mx-auto'>
            <Link to='/withoutquery' className='bg-gray-300 block w-fit my-8 mx-auto text-center py-2 px-4 rounded hover:bg-gray-400 font-medium'>Go to without query</Link>
            <h1 className='text-3xl text-center my-8 font-bold text-gray-400'>Posts Data</h1>
            <div className={`${isFetching ? 'bg-gray-300 opacity-50' : ''}`}>
                {posts.map(post => {
                    return (
                        <Link to={`${post.id}`} key={post.id} className='p-4 rounded-lg block border border-gray-200 my-6 cursor-pointer hover:bg-gray-900'>
                            <h2 className='font-bold text-lg mb-2 text-gray-400'>{post.title}</h2>
                            <p className='text-gray-400'>{post.body}</p>
                        </Link>
                    )
                })}
            </div>
            {hasNextPage && <div ref={ref} className='h-4 w-full bg-blue-200'></div>}
            {/* {hasNextPage && <button disabled={isFetchingNextPage} className='px-3 py-1 bg-blue-500 rounded-md text-white font-bold' onClick={() => fetchNextPage()}>Load more</button>} */}
            {/* <div className='flex items-center justify-center gap-2'>
                <button className='px-3 py-1 bg-blue-500 rounded-md text-white font-bold' onClick={() => setPage(prev => prev > 1 ? prev - 1 : 1)}>Prev</button>
                <p className='text-gray-100'>Current page: {page}</p>
                <button className='px-3 py-1 bg-blue-500 rounded-md text-white font-bold' onClick={() => setPage(prev => prev + 1)}>Next</button>
            </div> */}
        </div>
    );
}

export default WithQuery