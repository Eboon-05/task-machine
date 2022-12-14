import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

import {
    ArrowRightIcon,
    PlusIcon,
    CalendarIcon,
} from '@heroicons/react/24/solid'

import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { LevelSelect } from 'components/LevelSelect'
import { GroupSelect } from 'components/GroupSelect'

import { useAppDispatch } from 'hooks'
import { addTask } from 'redux/taskSlice'
import { Toast } from 'components/Toast'
import MyHead from 'components/MyHead'

const New: NextPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [level, setLevel] = useState<Task['level']>(2)
    const [error, setError] = useState<string>('')
    const [group, setGroup] = useState<string | undefined>(
        typeof router.query.group === 'string' ? router.query.group : undefined,
    )

    useEffect(() => {
        if (typeof router.query.group === 'string') {
            setGroup(router.query.group)
        }
    }, [router.query])

    const name = useRef<HTMLInputElement>(null)
    const date = useRef<HTMLInputElement>(null)

    const onCreate = () => {
        if (name.current && date.current) {
            if (!name.current.value) {
                return setError(`Task name can't be empty.`)
            }

            const newDate = DateTime.fromISO(date.current.value).toFormat('dd/MM/yyyy')
            
            const newTask: Task = {
                id: nanoid(),
                createdAt: DateTime.now().toISO(),
                name: name.current.value,
                level,
                done: false,
                due: date.current.value ? newDate : undefined
            }

            const id = router.query.group

            if (typeof id === 'string') {
                dispatch(
                    addTask({
                        task: newTask,
                        group: id,
                    }),
                )
                router.push(`/groups#${id}`)
            } else {
                dispatch(addTask({ task: newTask }))
                router.push('/')
            }
        }
    }

    return (
        <section className='p-2 h-screen flex flex-col justify-start'>
            <MyHead title='Create a new task' />
            <div className='p-5 sm:flex justify-between items-center'>
                <h1 className='text-4xl mb-2 font-varela'>Create a new task</h1>
                <Button className='m-auto sm:m-0' onClick={onCreate} color='primary'>
                    <ArrowRightIcon className='h-6 w-6' />
                </Button>
            </div>
            <div className='grid grid-cols-1 gap-2'>
                <span>Name</span>
                <Input ref={name} Icon={PlusIcon} placeholder='Task name' />

                <span>Date:</span>
                <Input ref={date} Icon={CalendarIcon} type='date' />
                <span className='text-sm opacity-60'>
                    You can leave date empty
                </span>

                <span>Difficulty:</span>
                <LevelSelect level={level} onChange={setLevel} />

                <span>Group:</span>
                <GroupSelect onChange={setGroup} group={group} />
            </div>

            {error ? (
                <Toast
                    title='Error!'
                    body={error}
                    type='error'
                    onClose={() => setError('')}
                />
            ) : null}
        </section>
    )
}

export default New
