import { FC, useState } from 'react'

import classNames from 'classnames'

import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { getLevelIcon } from 'utils/getLevelIcon'

interface Props {
    level: Task['level']
    onChange?: (value: Task['level']) => void
}

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
            {/* Selected option */}

            {/* Get the right icon */}
            {getLevelIcon(level, true)}

            {/* Get the right name */}
            {classNames({
                Low: level === 1,
                Medium: level === 2,
                Hard: level === 3,
            })}

            {/* The dropdown arrow */}
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
                <ul className='absolute w-full shadow-md bg-white inset-x-0 rounded-xl top-[64px] z-10'>
                    <li
                        className='p-4 pl-16 w-full text-lg relative cursor-pointer'
                        onClick={() => {
                            onChange(1)
                            setActive(false)
                        }}
                    >
                        {getLevelIcon(1, true)}
                        Low
                    </li>

                    <li
                        className='p-4 pl-16 w-full text-lg relative cursor-pointer'
                        onClick={() => {
                            onChange(2)
                            setActive(false)
                        }}
                    >
                        {getLevelIcon(2, true)}
                        Medium
                    </li>

                    <li
                        className='p-4 pl-16 w-full text-lg relative cursor-pointer'
                        onClick={() => {
                            onChange(3)
                            setActive(false)
                        }}
                    >
                        {getLevelIcon(3, true)}
                        Hard
                    </li>
                </ul>
            ) : null}
        </div>
    )
}

export { LevelSelect }
