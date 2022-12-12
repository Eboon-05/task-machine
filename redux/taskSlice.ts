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
        addGroup(state, action: PayloadAction<Group, 'ADD_GROUP'>) {
            state.groups.push(action.payload)
        },
        addToGroup(
            state,
            action: PayloadAction<
                { task: Task; group: string },
                'ADD_TO_GROUP'
            >,
        ) {
            const i = state.groups.findIndex(g => action.payload.group === g.id)

            if (i !== -1) {
                state.groups[i] = {
                    ...state.groups[i],
                    list: state.groups[i].list
                        ? [...state.groups[i].list, action.payload.task]
                        : [action.payload.task],
                }
            }
        },
        toggle(
            state,
            action: PayloadAction<{ task: Task; group?: string }, 'TOGGLE'>,
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

export const { add, addGroup, addToGroup, toggle, search, setTasks } =
    taskSlice.actions
