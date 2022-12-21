import { useRouter } from 'next/router'
import { FC, useMemo, useState } from 'react'
import classNames from 'classnames'
import { capitalize } from 'capitalize-ts'
import { Info } from 'luxon'

import { Check } from './Check'
import { FormattedMessage } from 'react-intl'

interface Props {
    days: Habit['days']
    onChange: (newDays: Habit['days']) => void
}

const WeekdayPicker: FC<Props> = ({ days, onChange }) => {
    const { locale } = useRouter()
    const [everyday, setEveryday] = useState(false)

    const weekdays = useMemo(() => {
        return Info.weekdays('short', { locale }).map(d => capitalize(d))
    }, [locale])

    return (
        <>
            <div className='flex justify-start items-center mb-2'>
                <Check
                    checked={everyday}
                    onChange={() => {
                        if (!everyday) {
                            onChange([0, 1, 2, 3, 4, 5, 6])
                        } else {
                            onChange([])
                        }
                        setEveryday(!everyday)
                    }}
                />
                <span className='ml-2'>
                    <FormattedMessage id='everyday' />
                </span>
            </div>
            <ul
                className={classNames({
                    [`
                        p-4 border-2 border-light-gray dark:border-dark-gray rounded-xl w-full text-lg 
                        dark:bg-black dark:text-white grid grid-cols-7 
                        justify-between gap-2
                    `]: true,
                    'pointer-events-none opacity-50': everyday,
                })}
            >
                {weekdays.map((d, i) => (
                    <li
                        key={i}
                        className={classNames({
                            'py-3 sm:p-3 rounded-xl dark:text-white text-center cursor-pointer select-none':
                                true,
                            'bg-light-gray dark:bg-dark-gray':
                                !everyday && days.includes(i),
                        })}
                        onClick={() => {
                            if (days.includes(i)) {
                                const newDays = [...days]
                                newDays.splice(days.indexOf(i), 1)
                                onChange(newDays)
                            } else {
                                onChange([...days, i])
                            }
                        }}
                    >
                        {d}
                    </li>
                ))}
            </ul>
        </>
    )
}

export { WeekdayPicker }
