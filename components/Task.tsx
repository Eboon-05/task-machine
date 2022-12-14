import { FC } from 'react'

import { TrashIcon, CalendarIcon } from '@heroicons/react/24/solid'

import { useAppDispatch } from 'hooks'
import { Check } from './Check'
import { removeTask, toggleTask } from 'redux/slices/task'
import { getLevelIcon } from 'utils/getLevelIcon'

interface Props {
    task: Task
    dark?: boolean
    group?: string
}

const Task: FC<Props> = ({ task, dark, group }) => {
    const { done, name, level } = task

    const dispatch = useAppDispatch()

    const complete = () => {
        dispatch(toggleTask({ task, group }))
    }

    const onRemove = () => {
        dispatch(removeTask({ task, group }))
    }

    return (
        <div className='flex justify-between items-center animate__animated animate__fadeIn'>
            <div className='flex justify-start items-center'>
                <div className='mr-2'>
                    <Check dark={dark} checked={done} onChange={complete} />
                </div>
                <div>
                    <div className={`${done && 'line-through'}`}>{name}</div>
                    {task.due ? (
                        <div className='flex justify-start items-center text-sm opacity-80'>
                            <CalendarIcon className='h-5 w-5 mr-1' />
                            {task.due}
                        </div>
                    ) : null}
                </div>
            </div>
            <div className='flex'>
                {getLevelIcon(level)}
                <button onClick={onRemove} className='ml-2'>
                    <TrashIcon className='h-6 w-6' />
                </button>
            </div>
        </div>
    )
}

export { Task }
