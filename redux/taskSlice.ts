import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TaskState {
    list?: Task[]
    groups?: Group[]
    habits?: Habit[]
    query: string
    user?: User
}

const initialState: TaskState = {
    query: '',
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask(
            state,
            action: PayloadAction<
                { task: Task; group?: string },
                'ADD_TO_GROUP'
            >,
        ) {
            if (action.payload.group) {
                const i = state.groups.findIndex(g => action.payload.group === g.id)
    
                if (i !== -1) {
                    state.groups[i] = {
                        ...state.groups[i],
                        list: state.groups[i].list
                            ? [...state.groups[i].list, action.payload.task]
                            : [action.payload.task],
                    }
                }
            } else {
                state.list.push(action.payload.task)
            }
        },
        addGroup(state, action: PayloadAction<Group, 'ADD_GROUP'>) {
            state.groups.push(action.payload)
        },
        addHabit(state, action: PayloadAction<Habit, 'ADD_HABIT'>) {
            state.habits.push(action.payload)
        },
        toggleTask(
            state,
            action: PayloadAction<{ task: Task; group?: string }, 'TOGGLE_TASK'>,
        ) {
            if (action.payload.group) {
                const i = state.groups.findIndex(
                    g => action.payload.group === g.id,
                )

                if (i !== -1) {
                    const newList = [...state.groups[i].list]
                    // Toggled task index
                    const t = newList.findIndex(
                        t => t.id === action.payload.task.id,
                    )

                    if (t !== -1) {
                        newList[t] = {
                            ...newList[t],
                            done: !newList[t].done,
                        }

                        state.groups[i].list = newList
                    }
                }
            } else {
                const newList: Task[] = [...state.list]
                const i = newList.findIndex(
                    t => t.id === action.payload.task.id,
                )

                if (i !== -1) {
                    newList[i] = {
                        ...newList[i],
                        done: !newList[i].done,
                    }

                    state.list = newList
                }
            }
        },
        toggleHabit(
            state,
            action: PayloadAction<Habit, 'TOGGLE_HABIT'>,
        ) {
            const newHabits: Habit[] = [...state.habits]
            const i = newHabits.findIndex(
                t => t.id === action.payload.id,
            )

            if (i !== -1) {
                newHabits[i] = {
                    ...newHabits[i],
                    done: !newHabits[i].done,
                }

                state.habits = newHabits
            }
        },
        removeTask(
            state,
            action: PayloadAction<{ task: Task; group?: string }, 'DELETE_TASK'>,
        ) {
            if (action.payload.group) {
                const i = state.groups.findIndex(
                    g => action.payload.group === g.id,
                )

                if (i !== -1) {
                    const newList = [...state.groups[i].list]
                    // Toggled task index
                    const t = newList.findIndex(
                        t => t.id === action.payload.task.id,
                    )

                    if (t !== -1) {
                        newList.splice(t, 1)

                        state.groups[i].list = newList
                    }
                }
            } else {
                const newList: Task[] = [...state.list]
                const i = newList.findIndex(
                    t => t.id === action.payload.task.id,
                )

                if (i !== -1) {
                    newList.splice(i, 1)

                    state.list = newList
                }
            }
        },
        removeHabit(
            state,
            action: PayloadAction<Habit, 'DELETE_HABIT'>,
        ) {
            const newHabits: Habit[] = [...state.habits]
            const i = newHabits.findIndex(
                t => t.id === action.payload.id,
            )

            if (i !== -1) {
                newHabits.splice(i, 1)

                state.habits = newHabits
            }
        },
        checkHabit(
            state,
            action: PayloadAction<Habit, 'CHECK_HABIT'>,
        ) {
            const newHabits: Habit[] = [...state.habits]
            const i = newHabits.findIndex(
                t => t.id === action.payload.id,
            )

            if (i !== -1) {
                newHabits[i] = {
                    ...newHabits[i],
                    done: false,
                    lastChecked: new Date()
                }

                state.habits = newHabits
            }
        },
        search(state, action: PayloadAction<string, 'SEARCH'>) {
            state.query = action.payload
        },
        setTasks(
            state,
            action: PayloadAction<
                { list?: Task[]; groups?: Group[], habits?: Habit[] },
                'SET_TASKS'
            >,
        ) {
            if (action.payload.list) {
                state.list = action.payload.list
            }
            if (action.payload.groups) {
                state.groups = action.payload.groups
            }
            if (action.payload.habits) {
                state.habits = action.payload.habits
            }
        },
    },
})

export const { addTask, addGroup, addHabit, toggleTask, toggleHabit, removeTask, removeHabit, checkHabit, search, setTasks } =
    taskSlice.actions
