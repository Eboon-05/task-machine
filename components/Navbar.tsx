import Link from 'next/link'
import { useState } from 'react'

import {
    HomeIcon,
    ListBulletIcon,
    MagnifyingGlassIcon,
    PlusIcon,
} from '@heroicons/react/24/solid'

import { SearchBar } from './SearchBar'

const links = [
    {
        path: '/',
        icon: <HomeIcon className='h-7 w-7' />,
    },
    {
        path: '/groups',
        icon: <ListBulletIcon className='h-7 w-7' />,
    },
]

const Navbar = () => {
    const [search, setSearch] = useState(false)

    return (
        <footer className='w-full'>
            <nav
                className='
                bg-light-gray w-[90%] py-5 px-8 rounded-2xl grid grid-cols-3 justify-center 
                items-center justify-items-center relative max-w-[330px]
            '
            >
                {links.map((l, i) => (
                    <Link href={l.path} key={i}>
                        {l.icon}
                    </Link>
                ))}

                <button onClick={() => setSearch(true)}>
                    <MagnifyingGlassIcon className='h-7 w-7' />
                </button>

                <Link
                    href='/new'
                    className='bg-dark-blue rounded-[1.25rem] shadow-md p-3 h-14 w-14 absolute top-[6px] -right-8
                flex items-center justify-center'
                >
                    <PlusIcon className='h-7 w-7 text-white' />
                </Link>
            </nav>

            <SearchBar onClose={() => setSearch(false)} active={search} />
        </footer>
    )
}

export { Navbar }
