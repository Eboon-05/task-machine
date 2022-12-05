import { Middleware } from "@reduxjs/toolkit"

import { AppState } from "redux/store"

export const storage: Middleware<{}, AppState> = store => next => action => {
    const state = store.getState()
    const storageState = JSON.parse(localStorage.getItem('tasks')) || {}

    if (
        state.task.list !== storageState.list ||
        state.task.groups !== storageState.groups
    ) {    
        localStorage.setItem('tasks', JSON.stringify({
            list: [
                ...state.task.list,
            ],
            groups: state.task.groups,
        }))
    }

    next(action)
}