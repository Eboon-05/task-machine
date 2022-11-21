import { FC } from 'react'

import { useAppDispatch, useAppSelector } from 'hooks'
import { Check } from './Check'
import { toggle } from 'redux/taskSlice'

const Task: FC<Task> = (task) => {
    const {
        done,
        name
    } = task

    const dispatch = useAppDispatch()
    const taskState = useAppSelector(state => state.task)

    const complete = () => {
        dispatch(toggle(task))
    }

    return <div className='flex justify-start items-center'>
        <div className='mr-2'>
            <Check checked={done} onChange={ev => complete()} />
        </div>
        <div>
            {name}
        </div>
    </div>
}

export { Task }