import { createSlice } from '@reduxjs/toolkit'

export interface ConfigState {
    dark?: boolean
    habitReminder?: boolean
}

const initialState: ConfigState = {
    dark: undefined,
    habitReminder: undefined
}

export const configSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        light(state) {
            state.dark = false
        },
        dark(state) {
            state.dark = true
        },
        toggleTheme(state) {
            state.dark =  !state.dark
        },
        reminderOn(state) {
            state.habitReminder = true
        },
        reminderOff(state) {
            state.habitReminder = false
        },
        toggleHabitReminder(state) {
            state.habitReminder = !state.habitReminder
        },
    },
})

export const { light, dark, toggleTheme, reminderOn, reminderOff, toggleHabitReminder } = configSlice.actions
