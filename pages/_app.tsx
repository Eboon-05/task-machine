import { useAppDispatch } from 'hooks'
import { AppProps } from 'next/app'
import { FC, useEffect } from 'react'
import { Provider } from 'react-redux'

import { store } from 'redux/store'
import { setTasks } from 'redux/taskSlice'

import '../styles/globals.css'

const InitState: FC = () => {
    useEffect(() => {
        const state = store.getState().task
        const storageState = JSON.parse(localStorage.getItem('tasks')) || {
            list: [],
            groups: [],
        }

        if (
            state.list !== storageState.list ||
            state.groups !== storageState.groups
        ) {
            store.dispatch(setTasks(storageState))
        }
    }, [])

    return <></>
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <InitState />
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
