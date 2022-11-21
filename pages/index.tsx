import { NextPage } from "next"

import { useAppSelector } from "hooks"

import { Task } from "components/Task"
import { Navbar } from 'components/Navbar'

const Home: NextPage = () => {
    const taskState = useAppSelector(state => state.task)

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
                    <ul>
                        {taskState.list.map((t, i) => <li key={i} 
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