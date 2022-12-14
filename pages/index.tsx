import { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { XMarkIcon } from '@heroicons/react/24/outline'

import { useAppDispatch, useAppSelector } from 'hooks'
import { search } from 'redux/slices/task'

import { Task } from 'components/Task'
import { Navbar } from 'components/Navbar'
import MyHead from 'components/MyHead'
import { Header } from 'components/Header'

const Home: NextPage = () => {
    const { task: taskState, theme: { dark }} = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        if (taskState.list) {
            if (taskState.query !== '') {
                setFiltered(
                    taskState.list.filter(t => {
                        return t.name
                            .toLowerCase()
                            .includes(taskState.query.toLowerCase())
                    }),
                )
            } else {
                setFiltered(taskState.list)
            }
        }
    }, [taskState.query, taskState.list])

    const clearQuery = () => {
        dispatch(search(''))
    }

    return (
        <section className='p-2 min-h-screen flex flex-col justify-between'>
            <MyHead />
            <div>
                <Header title='Task machine' search />

                <div>
                    {taskState.query ? (
                        <div className='flex justify-between items-center bg-light-gray p-5 mb-6 rounded-xl'>
                            <span>
                                Looking for &quot;{taskState.query}&quot;
                            </span>
                            <button onClick={clearQuery}>
                                <XMarkIcon className='h-6 w-6' />
                            </button>
                        </div>
                    ) : null}
                    <ul>
                        {filtered.map(t => (
                            <li key={t.id} className='mb-6'>
                                <Task task={t} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className='text-center'>
                    <Image
                        src={dark ? '/dark/ice-cream.svg' : '/ice-cream.svg'}
                        alt='ice-cream'
                        width={400}
                        height={400}
                        className='h-auto w-auto sm:max-w-[400px] m-auto'
                    />
                    <p>
                        Seems like you have no tasks. You can create one, or go
                        and get an ice cream!
                    </p>
                </div>
            ) : null}

            <Navbar />
        </section>
    )
}

export default Home
