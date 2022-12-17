import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/solid'

import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Toast } from 'components/Toast'

import { useAppDispatch } from 'hooks'
import { addHabit } from 'redux/slices/task'
import MyHead from 'components/MyHead'
import { Select } from 'components/Select'

const New: NextPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const name = useRef<HTMLInputElement>(null)

    const [error, setError] = useState<string>('')
    const [level, setLevel] = useState<'1' | '2' | '3'>('1')

    // Make an Option list based on possible levels
    const levelOptions: Option[] = useMemo(
        () => [
            {
                value: '1',
                name: 'Low',
                color: 'rgb(var(--light-blue))',
                icon: (
                    <Image
                        src='/icons/snowflake.svg'
                        alt='snowflake'
                        width={24}
                        height={24}
                    />
                ),
            },
            {
                value: '2',
                name: 'Medium',
                color: 'rgb(var(--light-orange))',
                icon: (
                    <Image
                        src='/icons/smile.svg'
                        alt='smile'
                        width={24}
                        height={24}
                    />
                ),
            },
            {
                value: '3',
                name: 'Hard',
                color: 'rgb(var(--light-red))',
                icon: (
                    <Image
                        src='/icons/fire.svg'
                        alt='fire'
                        width={24}
                        height={24}
                    />
                ),
            },
        ],
        [],
    )

    const onCreate = () => {
        if (name.current) {
            if (!name.current.value) {
                return setError(`Habit name can't be empty.`)
            }

            const newHabit: Habit = {
                id: nanoid(),
                name: name.current.value,
                done: false,
                level: parseInt(level) as Task['level'],
                lastChecked: DateTime.now().toISO(),
            }

            dispatch(addHabit(newHabit))
            router.push('/habits')
        }
    }

    useEffect(() => {
        if (name.current) {
            name.current.focus()
        }
    }, [name])

    return (
        <section className='p-2 h-screen flex flex-col justify-start'>
            <MyHead title='Create a new habit' />
            <div className='p-5 sm:flex justify-between items-center'>
                <h1 className='text-4xl mb-2 font-varela'>
                    Create a new habit
                </h1>
                <Button
                    className='m-auto sm:m-0'
                    onClick={onCreate}
                    color='primary'
                >
                    <ArrowRightIcon className='h-6 w-6' />
                </Button>
            </div>
            <div className='grid grid-cols-1 gap-2'>
                <span>Name:</span>
                <Input ref={name} Icon={PlusIcon} placeholder='Habit name' />

                <span>Difficulty:</span>
                <Select
                    value={level}
                    options={levelOptions}
                    onChange={setLevel as (v: string) => void}
                />
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
