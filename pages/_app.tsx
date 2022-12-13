import { AppProps } from 'next/app'
import { FC, useEffect } from 'react'
import { Provider } from 'react-redux'

import { useAppDispatch } from 'hooks'

import { store } from 'redux/store'
import { setTasks } from 'redux/taskSlice'

import 'animate.css'
import '../styles/globals.css'

const InitState: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const state = store.getState().task
        const storageState = JSON.parse(localStorage.getItem('tasks')) || {
            list: [],
            groups: [],
            habits: []
        }

        if (
            state.list !== storageState.list ||
            state.groups !== storageState.groups ||
            state.habits !== storageState.habits
        ) {
            dispatch(setTasks(storageState))
        }
    }, [])

    return <></>
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <main className='font-roboto'>
            <Provider store={store}>
                <InitState />
                <Component {...pageProps} />
            </Provider>
        </main>
    )
}

export default MyApp
