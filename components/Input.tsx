import { FC, forwardRef, HTMLInputTypeAttribute } from 'react'

interface Props {
    Icon: FC<{ className: string }>
    autoFocus?: boolean
    placeholder?: string
    type?: HTMLInputTypeAttribute
}

const Input = forwardRef<HTMLInputElement, Props>(
    ({ Icon, autoFocus, placeholder, type }, ref) => {
        return (
            <>
                <div className='relative'>
                    <span className='absolute top-[8px] left-[8px] bg-light-gray dark:bg-dark-gray p-3 rounded-xl'>
                        <Icon className='h-6 w-6 ' />
                    </span>

                    <input
                        ref={ref}
                        type={type || 'text'}
                        className='p-4 pl-16 border-2 border-light-gray dark:border-dark-gray outline-none rounded-xl w-full text-lg dark:bg-black dark:text-white'
                        autoFocus={autoFocus}
                        placeholder={placeholder}
                    />
                </div>
            </>
        )
    },
)

export { Input }
