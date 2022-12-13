import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/solid'

import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Toast } from 'components/Toast'

import { useAppDispatch } from 'hooks'
import { addHabit } from 'redux/taskSlice'
import { LevelSelect } from 'components/LevelSelect'

const New: NextPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const name = useRef<HTMLInputElement>(null)

    const [error, setError] = useState<string>('')
    const [level, setLevel] = useState<Task['level']>(2)

    const onCreate = () => {
        if (name.current) {
            if (!name.current.value) {
                return setError(`Habit name can't be empty.`)
            }

            const newHabit: Habit = {
                id: nanoid(),
                name: name.current.value,
                done: false,
                level,
                lastChecked: DateTime.now().toISO(),
            }

            dispatch(addHabit(newHabit))
            router.push('/habits')
        }
    }

    return (
        <section className='p-2 h-screen flex flex-col justify-start'>
            <div className='p-5 sm:flex justify-between items-center'>
                <h1 className='text-4xl mb-2 font-varela'>Create a new habit</h1>
                <Button className='m-auto sm:m-0' onClick={onCreate}>
                    <ArrowRightIcon className='h-6 w-6' />
                </Button>
            </div>
            <div className='grid grid-cols-1 gap-2'>
                <span>Name:</span>
                <Input ref={name} Icon={PlusIcon} placeholder='Habit name' />

                <span>Difficulty:</span>
                <LevelSelect level={level} onChange={setLevel} />
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
