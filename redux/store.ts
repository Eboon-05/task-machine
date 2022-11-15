import { Action, configureStore, PayloadAction, ThunkAction } from "@reduxjs/toolkit"
import { taskSlice } from "./taskSlice"

export const store = configureStore({
    reducer: {
        task: taskSlice.reducer
    }
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    PayloadAction<
        Task | undefined,
        'ADD'
    >
>