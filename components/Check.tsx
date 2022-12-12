import { ChangeEvent, FC } from 'react'
import classNames from 'classnames'

import { CheckIcon } from '@heroicons/react/20/solid'

interface Props {
    checked: boolean
    onChange: (ev: ChangeEvent<HTMLInputElement>) => void,
    dark?: boolean
}

const Check: FC<Props> = ({ checked, onChange, dark }) => {
    return (
        <>
            <div className='h-7 w-7 relative'>
                <input
                    type='checkbox'
                    checked={checked}
                    onChange={onChange}
                    className='absolute opacity-0 h-full w-full cursor-pointer z-[2]'
                />
                <span
                    className={classNames({
                        [`
                            absolute top-0 left-0 h-full w-full bg-transparent z-[1]
                            rounded-full border-2 flex justify-center items-center
                        `]: true,
                        'border-black': !dark,
                        'border-white': dark,
                        'bg-black': checked && !dark,
                        'bg-white': checked && dark,
                    })}
                >
                    <CheckIcon
                        className={classNames({
                            'h-3 w-3 font-bold': true,
                            'text-white': !dark,
                            'text-black': dark,
                            'hidden': !checked,
                        })}
                    />
                </span>
            </div>
        </>
    )
}

export { Check }
