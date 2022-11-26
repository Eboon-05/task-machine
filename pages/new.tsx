import { NextPage } from "next"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { nanoid } from "@reduxjs/toolkit"

import { ArrowRightIcon, PlusIcon, CalendarIcon } from '@heroicons/react/24/solid'

import { Button } from "components/Button"
import { Input } from "components/Input"
import { LevelSelect } from "components/LevelSelect"

import { useAppDispatch } from "hooks"
import { add } from 'redux/taskSlice'

const New: NextPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [level, setLevel] = useState<Task['level']>(2)

    const name = useRef<HTMLInputElement>(null)
    const date = useRef<HTMLInputElement>(null)

    const onCreate = () => {
        if (name.current && date.current) {
            const newTask: Task = {
                name: name.current.value,
                id: nanoid(),
                level,
                done: false
            }

            dispatch(add(newTask))
            router.push('/')
        }
    }

    return <>
        <section className="p-2 h-screen flex flex-col justify-start">
                <div className="p-5 sm:flex justify-between items-center">
                    <h1 className="text-4xl font-bold mb-2">
                        Create a new task
                    </h1>
                    <Button className="m-auto sm:m-0" onClick={onCreate}>
                        <ArrowRightIcon className="h-6 w-6" />
                    </Button>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    <Input ref={name} Icon={PlusIcon} placeholder='Task name' />

                    <Input ref={date} Icon={CalendarIcon} type='date' />
                    <span className="text-sm opacity-60">You can leave date empty</span>

                    <LevelSelect level={level} onChange={setLevel} />
                </div>
        </section>
    </>
}

export default New