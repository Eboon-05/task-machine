import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { DateTime } from 'luxon'
import hotkeys from 'hotkeys-js'

import { MagnifyingGlassIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

import { SearchBar } from './SearchBar'
import { Button } from './Button'

import { search as searchReducer } from 'redux/slices/task'
import { useAppDispatch } from 'hooks'
import { FormattedMessage } from 'react-intl'

interface Props {
    title?: string
    search?: boolean
}

const Header: FC<Props> = ({ title, search }) => {
    const { push, locale } = useRouter()
    const dispatch = useAppDispatch()

    const [searchActive, setSearchActive] = useState(false)

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
                })}
            >
                <h1 className='text-4xl font-varela'>
                    {title ? (
                        <FormattedMessage id={title} defaultMessage={title} />
                    ) : (
                        'Task machine'
                    )}
                </h1>
                <div className='mt-2 sm:m-0 flex'>
                    <Button
                        className={classNames({
                            'mr-2': search,
                        })}
                        onClick={() => push('/config')}
                        color='primary'
                    >
                        <Cog6ToothIcon className='h-7 w-7' />
                    </Button>
                    {search ? (
                        <Button
                            onClick={() => setSearchActive(true)}
                            color='light'
                        >
                            <MagnifyingGlassIcon className='h-7 w-7' />
                        </Button>
                    ) : null}
                </div>

                <SearchBar
                    onSubmit={onSearchSubmit}
                    onClose={() => setSearchActive(false)}
                    active={searchActive}
                />
            </header>
            <div className='mb-2'>
                <p className='text-lg text-center font-varela'>
                    <FormattedMessage
                        id='todayIs'
                        values={{
                            day: DateTime.now().setLocale(locale).weekdayLong,
                            date: DateTime.now()
                                .setLocale(locale)
                                .toFormat('DDD'),
                        }}
                    />
                    .
                </p>
            </div>
        </>
    )
}

export { Header }
