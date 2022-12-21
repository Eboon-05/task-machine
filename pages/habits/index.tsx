import Image from 'next/image'
import { useEffect, useState } from 'react'

import { XMarkIcon } from '@heroicons/react/24/outline'

import { useAppDispatch, useAppSelector } from 'hooks'

import { Navbar } from 'components/Navbar'
import { search } from 'redux/slices/task'
import { Habit } from 'components/Habit'
import MyHead from 'components/MyHead'
import { Header } from 'components/Header'

const Habits = () => {
    const {
        task,
        config: { dark },
        habit: { habits },
    } = useAppSelector(s => s)
    const dispatch = useAppDispatch()

    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        if (habits) {
            if (task.query !== '') {
                setFiltered(
                    habits.filter(t => {
                        return t.name
                            .toLowerCase()
                            .includes(task.query.toLowerCase())
                    }),
                )
            } else {
                setFiltered(habits)
            }
        }
    }, [task.query, habits])

    const clearQuery = () => {
        dispatch(search(''))
    }

    return (
        <section className='p-2 min-h-screen flex flex-col justify-between'>
            <MyHead title='Habits' />
            <div>
                <Header title='Habits' search />

                <div>
                    {task.query ? (
                        <div className='flex justify-between items-center bg-light-gray p-5 mb-6 rounded-xl dark:text-black'>
                            <span>Looking for &quot;{task.query}&quot;</span>
                            <button onClick={clearQuery}>
                                <XMarkIcon className='h-6 w-6' />
                            </button>
                        </div>
                    ) : null}
                    <ul>
                        {filtered.map(h => (
                            <li key={h.id} className='mb-6'>
                                <Habit habit={h} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {habits?.length === 0 ? (
                <div className='text-center'>
                    <Image
                        src={dark ? '/dark/plant.svg' : '/plant.svg'}
                        alt='plant'
                        width={400}
                        height={400}
                        className='h-auto w-auto m-auto'
                        priority
                    />
                    <p>
                        You have no habits. Habits are the key for building a
                        better you! Try something like &quot;water my
                        plants&quot; or &quot;read for 10 minutes&quot;.
                    </p>
                </div>
            ) : null}

            <Navbar />
        </section>
    )
}

export default Habits
