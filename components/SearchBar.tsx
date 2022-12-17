import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
    MagnifyingGlassIcon,
    ArrowRightIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid'

import { Input } from './Input'
import { Button } from './Button'

interface Props {
    active: boolean
    onClose: () => void
    onSubmit: (value: string) => void
}

const SearchBar: FC<Props> = ({ active, onClose, onSubmit }) => {
    const ref = useRef<HTMLInputElement | null>(null)
    const router = useRouter()

    const [animation, setAnimation] = useState('animate__bounceIn')

    const onExit = useCallback(() => {
        setAnimation('animate__bounceOut')
        setTimeout(() => {
            setAnimation('animate__bounceIn')
            onClose()
        }, 500)
    }, [onClose])

    const onSearch = useCallback(() => {
        onSubmit(`${ref.current.value}`)
        onExit()
    }, [onExit, onSubmit])

    const text = useMemo(() => {
        return `Search for a ${router.route === '/habits' ? 'habit' : 'task'}`
    }, [router.route])

    useEffect(() => {
        if (ref.current) {
            ref.current.onkeyup = (ev) => {
                ev.preventDefault()
                console.log(ev.key)                    
                if (ev.key === 'Enter') {
                    onSearch()
                } else if (ev.key === 'Escape') {
                    onExit()
                }
            }
        }
    }, [onExit, onSearch, ref])

    return active ? (
        <>
            <div
                className='
                fixed inset-0 backdrop-blur-sm z-[3] flex justify-center items-center
                
            '
            >
                <div
                    className={`p-8 relative bg-white dark:bg-black rounded-xl shadow-md animate__animated animate__faster ${animation}`}
                >
                    <p className='text-center text-3xl font-varela mb-2'>
                        {text}
                    </p>

                    <Input ref={ref} Icon={MagnifyingGlassIcon} autoFocus />

                    <div className='mt-2 flex justify-center'>
                        <Button onClick={onExit} className='mr-2'>
                            <XMarkIcon className='h-8 w-8 dark:text-white' />
                        </Button>

                        <Button onClick={onSearch} color='primary'>
                            <ArrowRightIcon className='h-6 w-6' />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    ) : null
}

export { SearchBar }
