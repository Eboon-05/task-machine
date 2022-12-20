import { ChangeEvent, FC } from 'react'
import classNames from 'classnames'

interface Props {
    checked: boolean
    onChange: (ev: ChangeEvent<HTMLInputElement>) => void
    dark?: boolean
}

const Switch: FC<Props> = ({ checked, onChange, dark }) => {
    return (
        <>
            <div className='h-8 w-14 relative'>
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
                            transition-colors duration-100 px-1
                        `]: true,
                        'border-black dark:border-white': !dark,
                        'border-white': dark,
                        'bg-black dark:bg-white': checked && !dark,
                        'bg-white': checked && dark,
                    })}
                >
                    <div className={classNames({
                        'h-5 w-5 rounded-full my-auto border-0 transition-transform': true,
                        '-translate-x-1/2 bg-black dark:bg-white': !checked,
                        'translate-x-1/2': checked,
                        // 'border-white dark:border-black': !dark,
                        // 'border-black': dark,
                        'bg-white dark:bg-black': checked && !dark,
                        'bg-black': checked && dark,
                    })}></div>
                </span>
            </div>
        </>
    )
}

export { Switch }
