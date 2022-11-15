import { useAppSelector } from "hooks"
import { NextPage } from "next"

const Home: NextPage = () => {
    const task = useAppSelector(state => state.task)

    return <>
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
        <p>{task.groups.length}</p>
    </>
}

export default Home