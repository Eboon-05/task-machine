import { useRouter } from 'next/router'
import { FC, useLayoutEffect, useMemo } from 'react'
import { DateTime, Info } from 'luxon'
import { Tooltip } from 'react-tooltip'
import { useIntl } from 'react-intl'

import { TrashIcon } from '@heroicons/react/24/solid'

import { Check } from './Check'

import { getLevelIcon } from 'utils/getLevelIcon'

import { useAppDispatch } from 'hooks'
import { checkHabit, removeHabit, toggleHabit } from 'redux/slices/habit'
import classNames from 'classnames'
import { capitalize } from 'capitalize-ts'
import { Button } from './Button'

interface Props {
    habit: Habit
    dark?: boolean
}

const Habit: FC<Props> = ({ habit, dark }) => {
    const { locale } = useRouter()
    const { messages } = useIntl()

    const { name, done, lastChecked, level } = habit

    const dispatch = useAppDispatch()

    const complete = () => {
        dispatch(toggleHabit(habit))
    }

    const onRemove = () => {
        dispatch(removeHabit(habit))
    }

    useLayoutEffect(() => {
        const now = DateTime.now()

        const checked = DateTime.fromISO(lastChecked)

        if (now.day !== checked.day) {
            dispatch(checkHabit(habit))
        }
    }, [dispatch, habit, lastChecked])

    const weekdays = useMemo(() => {
        return Info.weekdays('narrow', { locale }).map(d => capitalize(d))
    }, [locale])

    const today = useMemo(() => {
        return DateTime.now().weekday - 1
    }, [])

    const anchorId = useMemo(() => `${habit.id}-anchor`, [habit.id])
    const content = useMemo(() => {
        switch (level) {
            case 1:
                return messages.dEasy.toString()
            case 2:
                return messages.dMedium.toString()
            case 3:
                return messages.dHard.toString()
        }
    }, [level, messages.dEasy, messages.dHard, messages.dMedium])

    return (
        <div
            className='grid grid-cols-1 grid-rows-2 gap-1 sm:flex 
            justify-between items-center border-l-4 rounded-l 
            border-light-gray dark:border-dark-gray pl-2
            relative
            animate__animated animate__fadeIn'
        >
            <div
                className={classNames({
                    'absolute my-auto left-2': true,
                    'opacity-60 pointer-events-none':
                        !habit.days.includes(today),
                })}
            >
                <Check dark={dark} checked={done} onChange={complete} />
            </div>
            <div className='ml-10'>
                <div className='w-full '>
                    <div
                        className={classNames({
                            'line-through': done,
                            'opacity-60': !habit.days.includes(today),
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
                                        'bg-light-gray dark:bg-dark-gray':
                                            habit.days.includes(i) &&
                                            i !== today,
                                        // The weekday is today but is not included in habit days
                                        'bg-pink text-white':
                                            i === today &&
                                            !habit.days.includes(i),
                                        // The weekday is today and is included in habit days
                                        'bg-light-gray dark:bg-dark-gray text-pink dark:text-pink':
                                            habit.days.includes(i) &&
                                            i === today,
                                    })}
                                >
                                    {d}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        // If the habit is everyday
                        <p className='opacity-70 italic'>
                            {messages.repeatEveryday.toString()}
                        </p>
                    )}
                </div>
            </div>
            <div className='flex justify-center my-auto'>
                <a id={anchorId}>
                    {getLevelIcon(level)}
                </a>
                <Button onClick={onRemove} className='ml-2' color='danger'>
                    <TrashIcon className='h-6 w-6 text-white' />
                </Button>
            </div>
            <Tooltip anchorId={anchorId} content={content} />
        </div>
    )
}

export { Habit }
