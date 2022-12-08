import { Middleware } from "@reduxjs/toolkit"

import { AppState } from "redux/store"

export const storage: Middleware<{}, AppState> = store => next => action => {
    const state = store.getState().task
    const storageState = JSON.parse(localStorage.getItem('tasks')) || null

    // TODO: Run this code after reducer 
    // console.log('received state =>', state)

    if (state.list && state.groups && storageState) {
        // undefined list and groups - not null storage
        localStorage.setItem('tasks', JSON.stringify({
            list: [
                ...state.list,
            ],
            groups: state.groups,
        }))
    } else if (storageState) {
        // defined list and groups - not null storage
        // store.dispatch()
    }

    next(action)
}