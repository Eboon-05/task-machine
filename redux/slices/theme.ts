import { createSlice } from '@reduxjs/toolkit'

export interface ThemeState {
    dark?: boolean
}

const initialState: ThemeState = {
    dark: undefined,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        light(state) {
            state.dark = false
        },
        dark(state) {
            state.dark = true
        },
        toggle(state) {
            state.dark = !state.dark
        },
    },
})

export const { light, dark, toggle } = themeSlice.actions
