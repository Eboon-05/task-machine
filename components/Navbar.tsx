import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import {
    HomeIcon,
    Square2StackIcon,
    ArrowPathRoundedSquareIcon,
    PlusIcon,
} from '@heroicons/react/24/solid'

import classNames from 'classnames'

const links = [
    {
        path: '/',
        name: 'Home',
        icon: <HomeIcon className='h-7 w-7' />,
    },
    {
        path: '/groups',
        name: 'Groups',
        icon: <Square2StackIcon className='h-7 w-7' />,
    },
    {
        path: '/habits',
        name: 'Habits',
        icon: <ArrowPathRoundedSquareIcon className='h-7 w-7' />,
    },
]

const Navbar = () => {
    const { route } = useRouter()

    const [search, setSearch] = useState(false)
    const newLink = useMemo(() => {
        switch (route) {
            case '/groups':
                return '/groups/new'
            case '/habits':
                return '/habits/new'
            default:
                // Home page
                return '/new'
        }
    }, [route])

    return (
        <footer className='w-full'>
            <div className='h-[68px]'></div>

            <nav
                className='fixed bottom-2 inset-x-2 pr-1 w-[80%] mx-auto'
            >
                <div
                    className='bg-light-gray py-2 pr-3 sm:py-5 sm:px-8 rounded-2xl grid justify-center 
                    items-center justify-items-center max-w-[400px] grid-cols-3 font-varela
                    w-full h-full relative mx-auto'
                >
                    {links.map((l, i) => (
                        <Link
                            href={l.path}
                            key={i}
                            className={classNames({
                                'grid justify-center justify-items-center items-center':
                                    true,
                                'opacity-50': route !== l.path,
                                'grid-rows-2 sm:grid-rows-1 sm:grid-cols-2': route === l.path,
                            })}
                        >
                            {l.icon}
                            {l.path === route ? l.name : null}
                        </Link>
                    ))}

                    <div></div>

                    <Link
                        href={newLink}
                        className='bg-dark-blue rounded-[1.25rem] shadow-md p-3 h-14 w-14 absolute top-[6px] -right-8
                        flex items-center justify-center'
                    >
                        <PlusIcon className='h-7 w-7 text-white' />
                    </Link>
                </div>
            </nav>
        </footer>
    )
}

export { Navbar }
