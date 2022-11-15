import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface TaskState {
    list: Task[],
    groups: Group[]
}

const initialState: TaskState = {
    list: [],
    groups: []
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        add(state, action: PayloadAction<Task, 'ADD'>) {
            return {
                ...state,
                list: [
                    ...state.list,
                    action.payload
                ]
            }
        }
    }
})