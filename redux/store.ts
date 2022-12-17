import { configureStore, PayloadAction, ThunkAction } from '@reduxjs/toolkit'

// Slices
import { taskSlice, TaskState } from './slices/task'
import { themeSlice, ThemeState } from './slices/theme'
import { habitSlice, HabitState } from './slices/habit'

// Middlewares
import { dark } from './middlewares/dark'
import { storage } from './middlewares/storage'

export const store = configureStore({
    reducer: {
        task: taskSlice.reducer,
        habit: habitSlice.reducer,
        theme: themeSlice.reducer,
    },
    middleware: [storage, dark],
})

export type AppState = { task: TaskState; habit: HabitState; theme: ThemeState }

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    PayloadAction<Task | undefined, 'ADD'>
>
