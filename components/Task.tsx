import { FC } from 'react'

import { TrashIcon } from '@heroicons/react/24/solid'

import { useAppDispatch } from 'hooks'
import { Check } from './Check'
import { remove, toggle } from 'redux/taskSlice'

interface Props {
    task: Task
    dark?: boolean
    group?: string
}

const Task: FC<Props> = ({ task, dark, group }) => {
    const { done, name } = task

    const dispatch = useAppDispatch()

    const complete = () => {
        dispatch(toggle({ task, group }))
    }

    const onRemove = () => {
        dispatch(remove({ task, group }))
    }

    return (
        <div className='flex justify-between items-center'>
            <div className='flex justify-start items-center'>
                <div className='mr-2'>
                    <Check dark={dark} checked={done} onChange={complete} />
                </div>
                <div className={`${done && 'line-through'}`}>{name}</div>
            </div>
            <button onClick={onRemove}>
                <TrashIcon className='h-6 w-6' />
            </button>
        </div>
    )
}

export { Task }
