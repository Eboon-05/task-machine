import { AppProps } from 'next/app'
import { FC, useEffect } from 'react'
import { Provider } from 'react-redux'

import { useAppDispatch } from 'hooks'

import { store } from 'redux/store'
import { setTasks } from 'redux/slices/task'

import 'animate.css'
import '../styles/globals.css'
import { dark, light } from 'redux/slices/theme'

const InitState: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const { task, theme } = store.getState()

        const storageTask = JSON.parse(localStorage.getItem('tasks')) || {
            list: [],
            groups: [],
            habits: [],
        }

        const storageDark = JSON.parse(localStorage.getItem('dark'))

        if (
            task.list !== storageTask.list ||
            task.groups !== storageTask.groups ||
            task.habits !== storageTask.habits
        ) {
            dispatch(setTasks(storageTask))
        }

        if (theme.dark === undefined && typeof storageDark === 'boolean') {
            dispatch(storageDark ? dark() : light())
        } else if (theme.dark === undefined && storageDark === null) {
            const match = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches
            dispatch(match ? dark() : light())
        }
    }, [dispatch])

    return <></>
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <main className=' dark:bg-black dark:text-white'>
            <section className='font-roboto max-w-[768px] m-auto'>
                <Provider store={store}>
                    <InitState />
                    <Component {...pageProps} />
                </Provider>
            </section>
        </main>
    )
}

export default MyApp
