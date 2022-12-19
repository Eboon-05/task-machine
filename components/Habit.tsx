import { FC, useLayoutEffect, useMemo } from 'react'
import { DateTime, Info } from 'luxon'

import { TrashIcon } from '@heroicons/react/24/solid'

import { Check } from './Check'

import { getLevelIcon } from 'utils/getLevelIcon'

import { useAppDispatch } from 'hooks'
import { checkHabit, removeHabit, toggleHabit } from 'redux/slices/habit'
import classNames from 'classnames'
import { capitalize } from 'capitalize-ts'

interface Props {
    habit: Habit
    dark?: boolean
}

const Habit: FC<Props> = ({ habit, dark }) => {
    const { name, done, lastChecked, level } = habit

    const dispatch = useAppDispatch()

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
    }, [dispatch, habit, lastChecked])

    const isToday = useMemo(
        () => habit.days.includes(DateTime.now().weekday - 1),
        [habit.days],
    )

    const weekdays = useMemo(() => {
        return Info.weekdays('narrow').map(d => capitalize(d))
    }, [])

    const today = useMemo(() => {
        return DateTime.now().weekday
    }, [])

    return (
        <div className='grid grid-cols-1 grid-rows-2 gap-1 sm:flex justify-between items-center animate__animated animate__fadeIn'>
            <div
                className={classNames({
                    'flex justify-start items-center': true,
                })}
            >
                <div
                    className={`mr-2 ${
                        !isToday && 'pointer-events-none opacity-60'
                    }`}
                >
                    <Check dark={dark} checked={done} onChange={complete} />
                </div>
                <div className='w-full'>
                    <div
                        className={classNames({
                            'line-through': done,
                            'opacity-60': !isToday,
                        })}
                    >
                        {name}
                    </div>
                    {/* If the habit is not everyday */}
                    {habit.days.length < 7 ? (
                        <ul className='grid grid-cols-7 gap-1'>
                            {weekdays.map((d, i) => (
                                <li
                                    key={i}
                                    className={classNames({
                                        'text-center rounded-lg p-2': true,
                                        // The weekday is included in habit days but is not today
                                        'bg-light-gray dark:text-black':
                                            habit.days.includes(i) &&
                                            i !== today,
                                        // The weekday is today but is not included in habit days
                                        'bg-pink text-white':
                                            i === today - 1 &&
                                            !habit.days.includes(i),
                                        // The weekday is today and is included in habit days
                                        'bg-light-gray text-pink dark:text-pink':
                                            habit.days.includes(i) &&
                                            i === today - 1,
                                    })}
                                >
                                    {d}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        // If the habit is everyday
                        <p className='opacity-70 italic'>
                            Repeat this{' '}
                            <span className='text-pink'>everyday</span>!
                        </p>
                    )}
                </div>
            </div>
            <div className='flex justify-center'>
                {getLevelIcon(level)}
                <button
                    onClick={onRemove}
                    className='ml-2 px-3 bg-pink rounded-xl'
                >
                    <TrashIcon className='h-6 w-6 text-white' />
                </button>
            </div>
        </div>
    )
}

export { Habit }
