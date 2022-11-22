import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

const Button: FC<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = (props) => {
    return <button {...props}
        className={`
            bg-dark-blue rounded-[1.25rem] shadow-md p-3 h-14 w-14 text-white
            flex items-center justify-center
            ${props.className}
        `}
    >
        {props.children}
    </button>
}

export { Button }