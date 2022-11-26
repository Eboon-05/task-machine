import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TaskState {
    list: Task[],
    groups: Group[],
    query: string,
}

const initialState: TaskState = {
    list: [
        {
            id: 'tomate',
            name: 'Cortar tomate',
            done: true,
            level: 1
        },
        {
            id: 'zanahoria',
            name: 'Cortar zanahoria',
            done: false,
            level: 1
        },
        {
            id: 'naranja',
            name: 'Cortar naranja',
            done: true,
            level: 1
        },
        {
            id: 'perejil',
            name: 'Cortar perejil',
            done: false,
            level: 1
        },
    ],
    groups: [],
    query: ''
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
                        done: !newList[i].done
                    }
                }
            }

            state.list = newList
        },
        search(state, action: PayloadAction<string, 'SEARCH'>) {
            state.query = action.payload
        }
    }
})

export const { add, toggle, search } = taskSlice.actions