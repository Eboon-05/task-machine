import { configureStore, PayloadAction, ThunkAction } from '@reduxjs/toolkit'

// Slices
import { taskSlice, TaskState } from './slices/task'
import { configSlice, ConfigState } from './slices/config'
import { habitSlice, HabitState } from './slices/habit'

// Middlewares
import { dark } from './middlewares/dark'
import { storage } from './middlewares/storage'

export const store = configureStore({
    reducer: {
        task: taskSlice.reducer,
        habit: habitSlice.reducer,
        config: configSlice.reducer,
    },
    middleware: [storage, dark],
})

export type AppState = { task: TaskState; habit: HabitState; config: ConfigState }

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    PayloadAction<Task | undefined, 'ADD'>
>
