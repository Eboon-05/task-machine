import { FC } from 'react'

import { XMarkIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Button } from './Button'

interface Props {
    title: string
    body?: string | JSX.Element
    onClose: () => void
    type?: 'error'
    confirmIcon?: JSX.Element
    onConfirm?: () => void
    cancelIcon?: JSX.Element
    onCancel?: () => void
}

const Toast: FC<Props> = ({
    title,
    body,
    onClose,
    type,
    confirmIcon,
    onConfirm,
    cancelIcon,
    onCancel,
}) => {
    return (
        <div
            className={classNames({
                [`
                    fixed bottom-4 inset-x-4 rounded-xl shadow-lg p-4
                    animate__animated animate__bounceInUp animate__fast
                    max-w-[500px] m-auto z-20
                `]: true,
                'bg-light-gray dark:bg-dark-gray': !type,
                'bg-light-red text-black': type === 'error',
            })}
        >
            <div className='w-full h-full relative'>
                <div className='text-lg font-bold pr-5'>{title}</div>
                {body ? <p className='my-2'>{body}</p> : null}
                <div className='flex'>
                    {confirmIcon ? (
                        <Button
                            className='w-auto'
                            color='primary'
                            onClick={() => {
                                onConfirm && onConfirm()
                                onClose()
                            }}
                        >
                            {confirmIcon}
                        </Button>
                    ) : null}
                    {cancelIcon ? (
                        <Button
                            className='w-auto ml-2'
                            onClick={() => {
                                onCancel && onCancel()
                                onClose()
                            }}
                        >
                            {cancelIcon}
                        </Button>
                    ) : null}
                </div>
                <button className='absolute top-0 right-0' onClick={onClose}>
                    <XMarkIcon className='h-6 w-6' />
                </button>
            </div>
        </div>
    )
}

export { Toast }
