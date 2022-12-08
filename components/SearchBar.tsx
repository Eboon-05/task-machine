import { FC, useRef } from 'react'

import {
    MagnifyingGlassIcon,
    ArrowRightIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid'

import { Input } from './Input'
import { Button } from './Button'

import { search } from 'redux/taskSlice'
import { useAppDispatch } from 'hooks'

interface Props {
    active: boolean
    onClose: () => void
}

const SearchBar: FC<Props> = ({ active, onClose }) => {
    const ref = useRef<HTMLInputElement | null>(null)
    const dispatch = useAppDispatch()

    const onSearch = () => {
        if (ref.current) {
            if (ref.current.value !== '') {
                dispatch(search(ref.current.value))
            }
        }

        onClose()
    }

    return active ? (
        <>
            <div
                className='
                fixed inset-0 backdrop-blur-sm z-[3] flex justify-center items-center
            '
            >
                <div className='p-8 relative'>
                    <h1 className='text-center text-3xl font-bold mb-2'>
                        Search for a task
                    </h1>

                    <Input ref={ref} Icon={MagnifyingGlassIcon} autoFocus />

                    <Button className='m-auto mt-2' onClick={onSearch}>
                        <ArrowRightIcon className='h-6 w-6' />
                    </Button>

                    <button
                        className='absolute top-0 right-2'
                        onClick={onClose}
                    >
                        <XMarkIcon className='h-8 w-8' />
                    </button>
                </div>
            </div>
        </>
    ) : null
}

export { SearchBar }
