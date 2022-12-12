import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import {
    HomeIcon,
    ListBulletIcon,
    MagnifyingGlassIcon,
    PlusIcon,
} from '@heroicons/react/24/solid'

import { SearchBar } from './SearchBar'
import classNames from 'classnames'

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
    const { route } = useRouter()
    
    const [search, setSearch] = useState(false)

    return (
        <footer className='w-full'>
            <nav
                className={classNames({
                    [`
                    bg-light-gray w-[90%] py-5 px-8 rounded-2xl grid justify-center 
                    items-center justify-items-center relative max-w-[330px]
                    `]: true,
                    'grid-cols-3': route === '/',
                    'grid-cols-2': route === '/groups',
                })}
            >
                {links.map((l, i) => (
                    <Link href={l.path} key={i}>
                        {l.icon}
                    </Link>
                ))}

                {route === '/'
                    ? <button onClick={() => setSearch(true)}>
                        <MagnifyingGlassIcon className='h-7 w-7' />
                    </button>
                    : null
                }

                <Link
                    href={route === '/' ? '/new' : '/groups/new'}
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
