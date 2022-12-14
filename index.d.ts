interface Task {
    id: string
    createdAt: string
    name: string
    done: boolean
    due?: string
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
    level: 1 | 2 | 3
    lastChecked: string
}
