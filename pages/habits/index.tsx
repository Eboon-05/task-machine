import { useEffect, useState } from 'react'

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { useAppDispatch, useAppSelector } from 'hooks'

import { Navbar } from 'components/Navbar'
import { SearchBar } from 'components/SearchBar'
import { search } from 'redux/taskSlice'
import { Habit } from 'components/Habit'

const Habits = () => {
    const state = useAppSelector(state => state.task)
    const dispatch = useAppDispatch()

    const [filtered, setFiltered] = useState([])
    const [searchActive, setSearchActive] = useState(false)

    useEffect(() => {
        if (state.habits) {
            if (state.query !== '') {
                setFiltered(
                    state.habits.filter(t => {
                        return t.name
                            .toLowerCase()
                            .includes(state.query.toLowerCase())
                    }),
                )
            } else {
                setFiltered(state.habits)
            }
        }
    }, [state.query, state.habits])

    const clearQuery = () => {
        dispatch(search(''))
    }

    return (
        <section className='p-2 h-screen flex flex-col justify-between'>
            <div>
                {/* Page title */}
                <div className='p-5 flex justify-between items-center'>
                    <h1 className='text-4xl font-bold'>Habits</h1>
                    {/* Search button */}
                    <button onClick={() => setSearchActive(true)}>
                        <MagnifyingGlassIcon className='h-7 w-7' />
                    </button>{' '}
                </div>

                <div>
                    {state.query ? (
                        <div className='flex justify-between items-center bg-light-gray p-5 mb-6 rounded-xl'>
                            <span>Looking for "{state.query}"</span>
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

            <Navbar />
            <SearchBar
                onClose={() => setSearchActive(false)}
                active={searchActive}
            />
        </section>
    )
}

export default Habits
