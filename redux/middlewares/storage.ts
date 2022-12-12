import { Middleware } from '@reduxjs/toolkit'

import { AppState } from 'redux/store'

export const storage: Middleware<{}, AppState> = store => next => action => {
    // calls all the other middlewares and reducers
    next(action)

    // then runs its code
    const state = store.getState().task
    // const storageState = JSON.parse(localStorage.getItem('tasks')) || null

    if (state.list && state.groups && state.habits) {
        // defined list, groups and habits
        // save them in the localStorage
        localStorage.setItem(
            'tasks',
            JSON.stringify({
                list: state.list,
                groups: state.groups,
                habits: state.habits
            }),
        )
    }
}
