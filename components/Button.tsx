import classNames from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

interface Props
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    color?: 'primary' | 'light' | 'danger'
    shadow?: true
}

const Button: FC<Props> = props => {
    return (
        <button
            {...props}
            className={classNames({
                [`
                    rounded-2xl p-3 h-14 w-14 flex items-center
                    justify-center ${props.className} dark:text-black
                `]: true,
                'bg-dark-blue text-white dark:bg-pink':
                    props.color === 'primary',
                // 'dark:text-black': props.color !== 'primary',
                'bg-light-gray': props.color === 'light',
                'bg-light-red': props.color === 'danger',
                'shadow-md': props.shadow,
            })}
        >
            {props.children}
        </button>
    )
}

export { Button }
