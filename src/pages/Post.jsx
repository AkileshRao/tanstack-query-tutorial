import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'

const getComments = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    if (!res.ok) {
        throw new Error('There was an error!')
    }
    return res.json();
}

const Post = () => {
    const { id } = useParams();
    const { isPending, error, data } = useQuery({
        queryKey: ['posts', id, { hello: 'world' }],
        queryFn: async ({ queryKey }) => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            if (!res.ok) {
                throw new Error('There was an error!')
            }
            return res.json();
        },
        staleTime: 10000
    })

    const { isPending: isCommentsPending, error: commentsError, data: comments } = useQuery({
        queryKey: ['comments'],
        queryFn: () => getComments(id),
        enabled: !isPending
    });

    if (isPending) {
        return <h1 className='text-3xl text-center my-8 font-bold text-gray-400'>Loading...</h1>;
    }

    if (error) {
        return <h1 className='text-3xl text-center my-8 font-bold text-gray-400'>Error: {error.message}</h1>;
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='p-4 border-gray-400 border-4 rounded-lg w-4/5 max-w-[500px]'>
                <h2 className='font-bold text-lg mb-2 text-gray-400'>{data.title}</h2>
                <p className='text-gray-400'>{data.body}</p>
            </div>
        </div>
    )
}

export default Post