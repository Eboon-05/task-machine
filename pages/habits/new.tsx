import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'

import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/solid'

import { Button } from 'components/Button'
import { Input } from 'components/Input'

import { useAppDispatch } from 'hooks'
import { addHabit } from 'redux/taskSlice'

const New: NextPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const name = useRef<HTMLInputElement>(null)

    const onCreate = () => {
        if (name.current) {
            const newHabit: Habit = {
                id: nanoid(),
                name: name.current.value,
                done: false,
                lastChecked: new Date(),
            }

            dispatch(addHabit(newHabit))
            router.push('/habits')
        }
    }

    return (
        <section className='p-2 h-screen flex flex-col justify-start'>
            <div className='p-5 sm:flex justify-between items-center'>
                <h1 className='text-4xl font-bold mb-2'>Create a new habit</h1>
                <Button className='m-auto sm:m-0' onClick={onCreate}>
                    <ArrowRightIcon className='h-6 w-6' />
                </Button>
            </div>
            <div className='grid grid-cols-1 gap-2'>
                <span>Name:</span>
                <Input ref={name} Icon={PlusIcon} placeholder='Group name' />
            </div>
        </section>
    )
}

export default New
