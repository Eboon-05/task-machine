import { NextPage } from "next"
import { useEffect, useState } from "react"

import { XMarkIcon } from '@heroicons/react/24/solid'

import { useAppDispatch, useAppSelector } from "hooks"
import { search } from "redux/taskSlice"

import { Task } from "components/Task"
import { Navbar } from 'components/Navbar'

const Home: NextPage = () => {
    const taskState = useAppSelector(state => state.task)
    const dispatch = useAppDispatch()

    const [filtered, setFiltered] = useState(taskState.list)

    useEffect(() => {
        if (taskState.query !== '') {
            setFiltered(
                taskState.list.filter(t => {                   
                    return t.name.toLowerCase().includes(taskState.query.toLowerCase())
                })
            )
        } else {
            setFiltered(taskState.list)
        }
    }, [taskState.query, taskState.list])

    const clearQuery = () => {
        dispatch(search(''))
    }

    return <>
        <section className="p-2 h-screen flex flex-col justify-between">
            <div>
                <div className="p-5">
                    <h1 className="text-4xl font-bold">
                        Task machine
                    </h1>
                    <span>10 tasks for today</span>
                </div>

                <div>
                    {taskState.query
                        ? <div className="flex justify-between items-center bg-light-gray p-5 mb-6 rounded-xl">
                            <span>
                                Looking for "{taskState.query}"
                            </span>
                            <button onClick={clearQuery}>
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        : null
                    }
                    <ul>
                        {filtered.map((t, i) => <li key={i} 
                            className='mb-6'
                        >
                            <Task {...t} />
                        </li>)}
                    </ul>
                </div>
            </div>

            <Navbar />
        </section>
    </>
}

export default Home