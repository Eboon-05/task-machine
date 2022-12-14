import {
    configureStore,
    PayloadAction,
    ThunkAction,
} from '@reduxjs/toolkit'
import { storage } from './middlewares/storage'
import { taskSlice, TaskState } from './taskSlice'

export const store = configureStore({
    reducer: {
        task: taskSlice.reducer,
    },
    middleware: [storage],
})

export type AppState = { task: TaskState }

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    PayloadAction<Task | undefined, 'ADD'>
>
