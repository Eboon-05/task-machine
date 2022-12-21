import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import {
    HomeIcon,
    Square2StackIcon,
    ArrowPathRoundedSquareIcon,
    PlusIcon,
} from '@heroicons/react/24/solid'

import classNames from 'classnames'
import { Button } from './Button'
import { FormattedMessage } from 'react-intl'

const links = [
    {
        path: '/',
        name: 'home',
        icon: <HomeIcon className='h-7 w-7' />,
    },
    {
        path: '/groups',
        name: 'groups',
        icon: <Square2StackIcon className='h-7 w-7' />,
    },
    {
        path: '/habits',
        name: 'habits',
        icon: <ArrowPathRoundedSquareIcon className='h-7 w-7' />,
    },
]

const Navbar = () => {
    const { route, push } = useRouter()

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
            <div className='mb-2 h-[72px] sm:h-[68px]'></div>

            <nav className='fixed bottom-2 inset-x-2 pr-1 w-[80%] mx-auto'>
                <div
                    className='bg-light-gray dark:bg-dark-gray py-2 pr-3 sm:py-5 sm:px-8 rounded-2xl grid justify-center 
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
                                'grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 text-pink':
                                    route === l.path,
                            })}
                        >
                            <span>{l.icon}</span>
                            <span className='animate__animated animate__fadeInUp'>
                                {l.path === route ? <FormattedMessage id={l.name} /> : null}
                            </span>
                        </Link>
                    ))}

                    <div></div>

                    <Button
                        className='absolute top-[6px] -right-8 h-14 w-14'
                        color='primary'
                        style={{ padding: 0 }}
                        onClick={() => push(newLink)}
                    >
                        <PlusIcon className='h-7 w-7 text-white' />
                    </Button>
                </div>
            </nav>
        </footer>
    )
}

export { Navbar }
