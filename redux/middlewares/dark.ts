import { Middleware } from '@reduxjs/toolkit'

import { AppState } from 'redux/store'

export const dark: Middleware<object, AppState> = store => next => action => {
    // calls all the other middlewares and reducers
    next(action)

    // then runs its code
    const { theme } = store.getState()

    if (theme.dark) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}
