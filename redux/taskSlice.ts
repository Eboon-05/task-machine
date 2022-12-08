import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TaskState {
    list?: Task[]
    groups?: Group[]
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
        add(state, action: PayloadAction<Task, 'ADD'>) {
            state.list.push(action.payload)
        },
        toggle(state, action: PayloadAction<Task, 'TOGGLE'>) {
            const newList: Task[] = [...state.list]
            const i = newList.findIndex(t => t.id === action.payload.id)

            if (i !== -1) {
                if (action.payload.group) {
                    // Task is in a group
                } else {
                    newList[i] = {
                        ...newList[i],
                        done: !newList[i].done,
                    }
                }
            }

            state.list = newList
        },
        search(state, action: PayloadAction<string, 'SEARCH'>) {
            state.query = action.payload
        },
        setTasks(
            state,
            action: PayloadAction<
                { list?: Task[]; groups?: Group[] },
                'SET_TASKS'
            >,
        ) {
            if (action.payload.list) {
                state.list = action.payload.list
            }
            if (action.payload.groups) {
                state.groups = action.payload.groups
            }
        },
    },
})

export const { add, toggle, search, setTasks } = taskSlice.actions
