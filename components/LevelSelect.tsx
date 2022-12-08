import classNames from 'classnames'
import { FC, useState } from 'react'

import { HandThumbUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

interface Props {
    level: Task['level']
    onChange?: (value: Task['level']) => void
}

const icons = [
    // Cold
    <span className='absolute top-[6px] left-[6px] p-3 rounded-xl bg-light-blue'>
        <HandThumbUpIcon className='h-6 w-6 ' />
    </span>,
    // Medium
    <span className='absolute top-[6px] left-[6px] p-3 rounded-xl bg-light-orange'>
        <HandThumbUpIcon className='h-6 w-6 ' />
    </span>,
    // Hot
    <span className='absolute top-[6px] left-[6px] p-3 rounded-xl bg-light-red'>
        <HandThumbUpIcon className='h-6 w-6 ' />
    </span>,
]

const LevelSelect: FC<Props> = ({ level, onChange }) => {
    const [active, setActive] = useState(false)

    return (
        <div
            className={classNames({
                [`
                p-4 pl-16 border-2 border-light-gray outline-none rounded-xl w-full text-lg
                relative cursor-pointer
            `]: true,
            })}
            onClick={() => setActive(!active)}
        >
            {icons[level - 1]}

            {classNames({
                Low: level === 1,
                Medium: level === 2,
                Hard: level === 3,
            })}

            <span
                className={classNames({
                    'absolute top-[6px] right-[6px] transition-transform p-3':
                        true,
                    'rotate-180': active,
                })}
            >
                <ChevronDownIcon className='h-6 w-6' />
            </span>

            {active ? (
                <ul className='absolute w-full shadow-md bg-white inset-x-0 rounded-xl top-[64px]'>
                    <li
                        className='p-4 pl-16 w-full text-lg relative cursor-pointer'
                        onClick={() => {
                            onChange(1)
                            setActive(false)
                        }}
                    >
                        {icons[0]}
                        Low
                    </li>

                    <li
                        className='p-4 pl-16 w-full text-lg relative cursor-pointer'
                        onClick={() => {
                            onChange(2)
                            setActive(false)
                        }}
                    >
                        {icons[1]}
                        Medium
                    </li>

                    <li
                        className='p-4 pl-16 w-full text-lg relative cursor-pointer'
                        onClick={() => {
                            onChange(3)
                            setActive(false)
                        }}
                    >
                        {icons[2]}
                        Hard
                    </li>
                </ul>
            ) : null}
        </div>
    )
}

export { LevelSelect }
