import { FC, useState } from 'react'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import { SearchBar } from './SearchBar'
import classNames from 'classnames'

interface Props {
    title: string
    search?: boolean
}

const Header: FC<Props> = ({ title, search }) => {
    const [searchActive, setSearchActive] = useState(false)

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
                <button
                    className='mt-2 sm:m-0 bg-light-gray p-3 rounded-xl'
                    onClick={() => setSearchActive(true)}
                >
                    <MagnifyingGlassIcon className='h-7 w-7' />
                </button>
            ) : null}

            <SearchBar
                onClose={() => setSearchActive(false)}
                active={searchActive}
            />
        </header>
    )
}

export { Header }
