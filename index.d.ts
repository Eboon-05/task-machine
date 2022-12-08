interface Task {
    id: string;
    name: string;
    done: boolean;
    due?: Date;
    level: 1 | 2 | 3;
    group?: number;
}

interface Group {
    id: string;
    name: string;
    color: string;
}

interface User {
    username: string;
    token: string;
}
