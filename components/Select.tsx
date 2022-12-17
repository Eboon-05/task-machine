import { ChevronDownIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { FC, useState } from 'react'

interface Props {
    options: Option[]
    onChange: (value: string) => void
    value: string
}

const Select: FC<Props> = ({ options, value, onChange }) => {
    const [active, setActive] = useState(false)
    const [selected, setSelected] = useState(
        options.find(o => o.value === value),
    )

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
            <span
                className='p-3 rounded-xl absolute top-[6px] left-[6px]'
                style={{ backgroundColor: selected?.color || '#FFF' }}
            >
                {selected?.icon}
            </span>

            {selected?.name}
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
                    {options.map((opt, i) => (
                        <li
                            key={i}
                            className='p-4 pl-16 w-full text-lg relative cursor-pointer'
                            onClick={() => {
                                onChange(opt.value)
                                setSelected(opt)
                                setActive(false)
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: opt.color,
                                }}
                                className='absolute top-[6px] left-[6px] w-12 h-12 rounded-xl text-white p-3'
                            >
                                {opt.icon}
                            </div>
                            {opt.name}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    )
}

export { Select }
