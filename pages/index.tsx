import { NextPage } from 'next'
import Image from 'next/image'
import { useLayoutEffect, useState } from 'react'

import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import { useAppDispatch, useAppSelector } from 'hooks'
import { search } from 'redux/taskSlice'

import { Task } from 'components/Task'
import { Navbar } from 'components/Navbar'
import { SearchBar } from 'components/SearchBar'
import MyHead from 'components/MyHead'

const Home: NextPage = () => {
    const taskState = useAppSelector(state => state.task)
    const dispatch = useAppDispatch()

    const [filtered, setFiltered] = useState([])
    const [searchActive, setSearchActive] = useState(false)

    useLayoutEffect(() => {
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
        <section className='p-2 h-screen flex flex-col justify-between'>
            <MyHead />
            <div>
                <div className='p-5 flex justify-between items-center'>
                    <h1 className='text-4xl font-varela'>Task machine</h1>
                    <button onClick={() => setSearchActive(true)}>
                        <MagnifyingGlassIcon className='h-7 w-7' />
                    </button>{' '}
                </div>

                <div>
                    {taskState.query ? (
                        <div className='flex justify-between items-center bg-light-gray p-5 mb-6 rounded-xl'>
                            <span>Looking for "{taskState.query}"</span>
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
                        src='/ice-cream.svg'
                        alt='ice-cream'
                        width={400}
                        height={400}
                        className='h-auto w-auto'
                    />
                    <p>
                        Seems like you have no tasks. You can create one, or go
                        and get an ice cream!
                    </p>
                </div>
            ) : null}

            <Navbar />
            <SearchBar
                onClose={() => setSearchActive(false)}
                active={searchActive}
            />
        </section>
    )
}

export default Home
