import { FC } from 'react'

import { XMarkIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

interface Props {
    title: string
    body?: string
    onClose?: () => void
    type?: 'error'
}

const Toast: FC<Props> = ({ title, body, onClose, type }) => {
    return (
        <div
            className={classNames({
                [`
                    fixed bottom-4 inset-x-4 rounded-xl shadow-lg p-4
                    animate__animated animate__bounceInUp animate__fast
                `]: true,
                'bg-light-red': type === 'error',
            })}
        >
            <div className='w-full h-full relative'>
                <div className='text-lg font-bold'>{title}</div>
                {body ? <p className=''>{body}</p> : null}
                <button className='absolute top-0 right-0' onClick={onClose}>
                    <XMarkIcon className='h-6 w-6' />
                </button>
            </div>
        </div>
    )
}

export { Toast }
