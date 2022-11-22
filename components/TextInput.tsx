import { FC, forwardRef } from 'react'

interface Props {
    Icon: FC<{ className: string }>,
    autoFocus?: boolean
}

const TextInput = forwardRef<HTMLInputElement, Props>(({ Icon, autoFocus }, ref) => {

    return <>
        <div className="relative">
            <span className='absolute top-[.4rem] left-[.4rem] bg-light-gray p-3 rounded-xl'>
                <Icon className='h-6 w-6 ' />
            </span>

            <input 
                ref={ref}
                type="text"
                className="p-4 pl-14 border-2 border-light-gray outline-none rounded-xl" 
                autoFocus={autoFocus}
            />
        </div>
    </>
})

export { TextInput }