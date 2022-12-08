import { FC } from 'react'

import { useAppDispatch } from 'hooks'
import { Check } from './Check'
import { toggle } from 'redux/taskSlice'

const Task: FC<Task> = task => {
    const { done, name } = task

    const dispatch = useAppDispatch()

    const complete = () => {
        dispatch(toggle(task))
    }

    return (
        <div className='flex justify-start items-center'>
            <div className='mr-2'>
                <Check checked={done} onChange={complete} />
            </div>
            <div className={`${done && 'line-through'}`}>{name}</div>
        </div>
    )
}

export { Task }
