interface Task {
    id: string
    name: string
    done: boolean
    due?: Date
    level: 1 | 2 | 3
}

interface Group {
    id: string
    name: string
    color: string
    list: Task[]
}

interface User {
    username: string
    token: string
}

interface Habit {
    id: string
    name: string
    done: boolean
    lastChecked: Date
}