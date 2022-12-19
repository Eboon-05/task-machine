import { FC } from 'react'

import { TrashIcon, CalendarIcon } from '@heroicons/react/24/solid'

import { useAppDispatch } from 'hooks'
import { Check } from './Check'
import { removeTask, toggleTask } from 'redux/slices/task'
import { getLevelIcon } from 'utils/getLevelIcon'
import { Button } from './Button'

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
        <div 
            className='grid grid-cols-1 grid-rows-2 gap-1 sm:flex 
            justify-between items-center border-l-4 rounded-l 
            border-light-gray dark:border-dark-gray pl-2
            relative
            animate__animated animate__fadeIn'
        >
            <div className='absolute my-auto left-2'>
                <Check dark={dark} checked={done} onChange={complete} />
            </div>
            <div className='ml-10'>
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
            <div className='flex justify-center my-auto'>
                {getLevelIcon(level)}
                <Button color='danger' onClick={onRemove} className='ml-2 px-3'>
                    <TrashIcon className='h-6 w-6' />
                </Button>
            </div>
        </div>
    )
}

export { Task }
