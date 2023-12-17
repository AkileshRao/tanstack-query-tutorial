import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WithoutQuery = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <h1 className='text-3xl text-center my-8 font-bold text-gray-400'>Loading...</h1>;
    }

    if (error) {
        return <h1 className='text-3xl text-center my-8 font-bold text-gray-400'>Error: {error.message}</h1>;
    }

    return (
        <div className='m-4 max-w-[600px] w-4/5 mx-auto'>
            <Link to='/withquery' className='bg-gray-300 block w-fit my-8 mx-auto text-center py-2 px-4 rounded hover:bg-gray-400 font-medium'>Go to with query</Link>
            <h1 className='text-3xl text-center my-8 font-bold text-gray-400'>Posts Data</h1>
            {data && data.map(post => {
                return (
                    <div key={post.id} className='p-4 rounded-lg border border-gray-200 my-6 cursor-pointer hover:bg-gray-900'>
                        <h2 className='font-bold text-lg mb-2 text-gray-400'>{post.title}</h2>
                        <p className='text-gray-400'>{post.body}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default WithoutQuery;