import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

export interface HabitState {
    habits?: Habit[]
}

const initialState: HabitState = {}

export const habitSlice = createSlice({
    name: 'habit',
    initialState,
    reducers: {
        addHabit(state, action: PayloadAction<Habit, 'ADD_HABIT'>) {
            state.habits.push(action.payload)
        },
        toggleHabit(state, action: PayloadAction<Habit, 'TOGGLE_HABIT'>) {
            const newHabits: Habit[] = [...state.habits]
            const i = newHabits.findIndex(t => t.id === action.payload.id)

            if (i !== -1) {
                newHabits[i] = {
                    ...newHabits[i],
                    done: !newHabits[i].done,
                }

                state.habits = newHabits
            }
        },
        removeHabit(state, action: PayloadAction<Habit, 'DELETE_HABIT'>) {
            const newHabits: Habit[] = [...state.habits]
            const i = newHabits.findIndex(t => t.id === action.payload.id)

            if (i !== -1) {
                newHabits.splice(i, 1)

                state.habits = newHabits
            }
        },
        checkHabit(state, action: PayloadAction<Habit, 'CHECK_HABIT'>) {
            const newHabits: Habit[] = [...state.habits]
            const i = newHabits.findIndex(t => t.id === action.payload.id)

            if (i !== -1) {
                newHabits[i] = {
                    ...newHabits[i],
                    done: false,
                    lastChecked: DateTime.now().toISO(),
                }

                state.habits = newHabits
            }
        },
        setHabits(
            state,
            action: PayloadAction<{ habits?: Habit[] }, 'SET_HABITS'>,
        ) {
            if (action.payload.habits) {
                state.habits = action.payload.habits
            }
        },
    },
})

export const { addHabit, toggleHabit, removeHabit, checkHabit, setHabits } =
    habitSlice.actions
