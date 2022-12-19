import { Middleware } from '@reduxjs/toolkit'

import { AppState } from 'redux/store'

export const storage: Middleware<object, AppState> =
    store => next => action => {
        // calls all the other middlewares and reducers
        next(action)

        // then runs its code
        const {
            task,
            theme,
            habit: { habits },
        } = store.getState()
        // const storageState = JSON.parse(localStorage.getItem('tasks')) || null

        if (task.list && task.groups && habits) {
            // defined list, groups and habits
            // save them in the localStorage
            localStorage.setItem(
                'tasks',
                JSON.stringify({
                    list: task.list,
                    groups: task.groups,
                    habits: habits,
                }),
            )
        }

        if (theme.dark !== undefined) {
            localStorage.setItem('dark', `${theme.dark}`)
        }
    }
