import classNames from 'classnames'
import { ChangeEvent, FC } from 'react'

interface Props {
    checked: boolean,
    onChange: (ev: ChangeEvent<HTMLInputElement>) => void
}

const Check: FC<Props> = ({ checked, onChange }) => {
    return <>
        <div className='h-7 w-7 relative'>
            <input type="checkbox" checked={checked} onChange={onChange}
                className='absolute opacity-0 h-full w-full cursor-pointer z-[2]'
            />
            <span
                className={classNames({
                    [`
                        absolute top-0 left-0 h-full w-full bg-transparent z-[1]
                        rounded-full border-2 border-black
                    `]: true,
                    'bg-black': checked
                })}
            ></span>
        </div>
    </>
}

export { Check }