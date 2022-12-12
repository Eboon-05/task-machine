import { useRouter } from 'next/router'
import { FC, useLayoutEffect } from 'react'

import { TrashIcon } from '@heroicons/react/24/solid'

import { useAppDispatch } from 'hooks'
import { Check } from './Check'
import { checkHabit, removeHabit, toggleHabit } from 'redux/taskSlice'

interface Props {
    habit: Habit
    dark?: boolean
}

const Habit: FC<Props> = ({ habit, dark }) => {
    const { name, done, lastChecked } = habit

    const dispatch = useAppDispatch()
    const router = useRouter()

    const complete = () => {
        dispatch(toggleHabit(habit))
    }

    const onRemove = () => {
        dispatch(removeHabit(habit))
    }

    useLayoutEffect(() => {
        const today = new Date().getDate()
        const checkedDay = new Date(lastChecked).getDate()

        if (today !== checkedDay) {
            console.log('is diff')
            dispatch(checkHabit(habit))
        }
    }, [])

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
