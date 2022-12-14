import { FC, useState } from 'react'

import { ChevronDownIcon } from '@heroicons/react/24/outline'

import classNames from 'classnames'

interface Props {
    onChange?: (color: string) => void
}

const ColorPicker: FC<Props> = ({ onChange }) => {
    const [active, setActive] = useState(false)
    const [selected, setSelected] = useState(0)

    const colors = [
        '#e63946',
        '#1d3557',
        '#ff5678',
        '#2a9d8f',
        '#5a189a',
        '#000000',
        '#22577a',
    ]

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
            <div
                style={{
                    backgroundColor: colors[selected],
                }}
                className='absolute top-[6px] left-[6px] w-12 h-12 rounded-xl text-white p-3'
            ></div>

            {colors[selected]}

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
                <ul
                    className='absolute w-full shadow-md bg-white inset-x-0 rounded-xl top-[64px] z-10
                    dark:bg-black dark:border-2 dark:border-light-gray'
                >
                    {colors.map(c => {
                        return (
                            <li
                                key={c}
                                className='p-4 pl-16 w-full text-lg relative cursor-pointer'
                                onClick={() => {
                                    onChange(c)
                                    setSelected(colors.indexOf(c))
                                    setActive(false)
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: c,
                                    }}
                                    className='absolute top-[6px] left-[6px] w-12 h-12 rounded-xl text-white p-3'
                                ></div>

                                {c}
                            </li>
                        )
                    })}
                </ul>
            ) : null}
        </div>
    )
}

export { ColorPicker }
