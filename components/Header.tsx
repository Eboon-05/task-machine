import { FC, useState } from 'react'
import classNames from 'classnames'

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

    return (
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
    )
}

export { Header }
