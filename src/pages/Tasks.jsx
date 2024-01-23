import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import React from 'react'
import { useState } from 'react';

const fetchTasks = async () => {
    const res = await fetch("http://localhost:3000/tasks");
    if (!res.ok) throw new Error("Something went wrong!");
    return res.json();
}

const Tasks = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const queryClient = useQueryClient();

    const { data, isPending, isError } = useQuery({
        queryKey: ["tasks"],
        queryFn: fetchTasks
    });

    //CONVERT INTO MUTATION
    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:3000/deletetask/${id}`);
    }

    //CONVERT INTO MUTATION
    const handleAdd = async ({ title, description, id, isComplete }) => {
        const res = await fetch('http://localhost:3000/addtask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description })
        })
        return res.json();
    }

    const addMutation = useMutation({
        mutationFn: handleAdd,
        onMutate: async (newTask) => {
            await queryClient.cancelQueries({ queryKey: ['tasks'] });
            const previousTasks = queryClient.getQueryData(['tasks']);
            queryClient.setQueryData(['tasks'], (old) => {
                return { tasks: [...old.tasks, newTask] }
            });
            return { previousTasks };
        },
        onError: (err, newTask, context) => {
            queryClient.setQueryData(['tasks'], context.previousTasks)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })

    return (
        <div className='flex flex-col justify-center items-center max-w-[768px] mx-auto'>
            <p>Adding a task: {JSON.stringify(addMutation.isPending)}</p>
            <div className='my-4'>
                <h1 className='text-center font-bold text-2xl my-4'>Add task</h1>
                <input type="text" value={title} placeholder='Enter task title' className='p-2 mx-2 rounded' onChange={e => setTitle(e.target.value)} />
                <input type="text" value={description} placeholder='Enter task description' className='p-2 mx-2 rounded' onChange={e => setDescription(e.target.value)} />
                <button className='bg-blue-700 text-white font-bold px-4 py-2 rounded' onClick={() => addMutation.mutate({ title, description, id: Math.random(), isComplete: false })}>Submit</button>
            </div>
            <hr className='border border-gray-300 w-full my-4' />
            <div className='w-full'>
                <h1 className='text-center font-bold text-2xl my-4'>Tasks</h1>
                {isError && <h1 className='text-center font-bold text-2xl my-4'>No tasks found! Something went wrong.</h1>}
                {isPending && <h1 className='text-center font-bold text-2xl my-4'>Loading tasks...</h1>}
                {
                    data && data.tasks.map(task => {
                        return (
                            <div id={task.id} key={task.id} className='flex justify-between items-center w-100 bg-gray-300 px-4 py-3 rounded my-2'>
                                <div>
                                    <h3 className='font-bold text-lg'>{task.title}</h3>
                                    <p>{task.description}</p>
                                </div>
                                <button className='bg-red-700 text-white font-bold px-4 py-1 rounded' onClick={() => handleDelete(task.id)}>Delete</button>
                            </div>
                        )
                    })
                }
                {addMutation.isPending && (
                    <div key={addMutation.variables.id} className='flex opacity-50 justify-between items-center w-100 bg-gray-300 px-4 py-3 rounded my-2'>
                        <div>
                            <h3 className='font-bold text-lg'>{addMutation.variables.title}</h3>
                            <p>{addMutation.variables.description}</p>
                        </div>
                        <button className='bg-red-700 text-white font-bold px-4 py-1 rounded' onClick={() => handleDelete(addMutation.variables.id)}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Tasks