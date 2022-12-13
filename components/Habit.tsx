import { useRouter } from 'next/router'
import { FC, useLayoutEffect } from 'react'
import { DateTime } from 'luxon'

import { TrashIcon } from '@heroicons/react/24/solid'

import { Check } from './Check'

import { getLevelIcon } from 'utils/getLevelIcon'

import { useAppDispatch } from 'hooks'
import { checkHabit, removeHabit, toggleHabit } from 'redux/taskSlice'

interface Props {
    habit: Habit
    dark?: boolean
}

const Habit: FC<Props> = ({ habit, dark }) => {
    const { name, done, lastChecked, level } = habit

    const dispatch = useAppDispatch()
    const router = useRouter()

    const complete = () => {
        dispatch(toggleHabit(habit))
    }

    const onRemove = () => {
        dispatch(removeHabit(habit))
    }

    useLayoutEffect(() => {
        const today = DateTime.now().day
        const checkedDay = DateTime.fromISO(lastChecked).day

        if (today !== checkedDay) {
            dispatch(checkHabit(habit))
        }
    }, [])

    return (
        <div className='flex justify-between items-center animate__animated animate__fadeIn'>
            <div className='flex justify-start items-center'>
                <div className='mr-2'>
                    <Check dark={dark} checked={done} onChange={complete} />
                </div>
                <div>
                    <div className={`${done && 'line-through'}`}>{name}</div>
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

export { Habit }
