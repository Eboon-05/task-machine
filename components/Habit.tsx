import { FC, useLayoutEffect } from 'react'

import { TrashIcon, CalendarIcon } from '@heroicons/react/24/solid'

import { useAppDispatch } from 'hooks'
import { Check } from './Check'
import { removeHabit, toggleHabit } from 'redux/taskSlice'

interface Props {
    habit: Habit
    dark?: boolean
}

const Habit: FC<Props> = ({ habit, dark }) => {
    const { name, done } = habit

    const dispatch = useAppDispatch()

    const complete = () => {
        dispatch(toggleHabit(habit))
    }

    const onRemove = () => {
        dispatch(removeHabit(habit))
    }

    return (
        <div className='flex justify-between items-center'>
            <div className='flex justify-start items-center'>
                <div className='mr-2'>
                    <Check dark={dark} checked={done} onChange={complete} />
                </div>
                <div>
                    <div className={`${done && 'line-through'}`}>{name}</div>
                </div>
            </div>
            <button onClick={onRemove}>
                <TrashIcon className='h-6 w-6' />
            </button>
        </div>
    )
}

export { Habit }
