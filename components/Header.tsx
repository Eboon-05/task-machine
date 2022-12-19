import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { DateTime } from 'luxon'
import hotkeys from 'hotkeys-js'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import { SearchBar } from './SearchBar'
import { Button } from './Button'

import { search as searchReducer } from 'redux/slices/task'
import { useAppDispatch } from 'hooks'

interface Props {
    title: string
    search?: boolean
}

const Header: FC<Props> = ({ title, search }) => {
    const [searchActive, setSearchActive] = useState(false)
    const dispatch = useAppDispatch()

    const onSearchSubmit = (value: string) => {
        if (value) {
            dispatch(searchReducer(value))
        }
    }

    useEffect(() => {
        const handler = (ev: KeyboardEvent) => {
            ev.preventDefault()
            setSearchActive(!searchActive)
        }
        hotkeys('ctrl+k', handler)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <header
                className={classNames({
                    'p-5 flex flex-col sm:flex-row sm:justify-between justify-start items-center':
                        true,
                    'h-[52px] box-content': !search,
                })}
            >
                <h1 className='text-4xl font-varela'>{title}</h1>
                {search ? (
                    <Button
                        className='mt-2 sm:m-0'
                        onClick={() => setSearchActive(true)}
                        color='light'
                    >
                        <MagnifyingGlassIcon className='h-7 w-7' />
                    </Button>
                ) : null}

                <SearchBar
                    onSubmit={onSearchSubmit}
                    onClose={() => setSearchActive(false)}
                    active={searchActive}
                />
            </header>
            <div className='mb-2'>
                <p className='text-lg text-center font-varela'>
                    Today is{' '}
                    <span className='text-pink'>
                        {DateTime.now().weekdayLong}
                    </span>{' '}
                    {DateTime.now().toFormat('DDD')}.
                </p>
            </div>
        </>
    )
}

export { Header }
