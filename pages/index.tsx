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
import { FormattedMessage } from 'react-intl'

const Home: NextPage = () => {
    const {
        task: taskState,
        config: { dark },
    } = useAppSelector(state => state)
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
                <Header search />

                <div>
                    {taskState.query ? (
                        <div className='flex justify-between items-center bg-light-gray dark:bg-dark-gray p-5 mb-6 rounded-xl'>
                            <span>
                                <FormattedMessage 
                                    id='lookingFor'
                                    values={{
                                        query: taskState.query
                                    }}
                                />
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

            {taskState.list?.length === 0 ? (
                <div className='text-center'>
                    <Image
                        src={dark ? '/dark/ice-cream.svg' : '/ice-cream.svg'}
                        alt='ice-cream'
                        width={400}
                        height={400}
                        className='h-auto w-auto m-auto'
                        priority
                    />
                    <p>
                        <FormattedMessage id='noTasks' />
                    </p>
                </div>
            ) : null}

            <Navbar />
        </section>
    )
}

export default Home
