import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import hotkeys from 'hotkeys-js'
import { FormattedMessage, useIntl } from 'react-intl'

import {
    ArrowLeftIcon,
    ArrowRightIcon,
    PlusIcon,
} from '@heroicons/react/24/outline'

import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Toast } from 'components/Toast'

import { useAppDispatch } from 'hooks'
import { addHabit } from 'redux/slices/habit'
import MyHead from 'components/MyHead'
import { Select } from 'components/Select'
import { WeekdayPicker } from 'components/WeekdayPicker'

const New: NextPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { messages } = useIntl()

    const name = useRef<HTMLInputElement>(null)

    const [error, setError] = useState<string>('')
    const [level, setLevel] = useState<'1' | '2' | '3'>('1')
    const [days, setDays] = useState<Habit['days']>([])

    // Make an Option list based on possible levels
    const levelOptions: Option[] = useMemo(
        () => [
            {
                value: '1',
                name: messages.easy.toString(),
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
                name: messages.medium.toString(),
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
                name: messages.hard.toString(),
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
        [messages.easy, messages.hard, messages.medium],
    )

    const onCreate = useCallback(() => {
        if (name.current) {
            if (!name.current.value) {
                return setError(messages.emptyNameError.toString())
            }

            if (days.length === 0) {
                return setError(messages.emptyDaysError.toString())
            }

            const newHabit: Habit = {
                id: nanoid(),
                name: name.current.value,
                done: false,
                level: parseInt(level) as Task['level'],
                days,
                lastChecked: DateTime.now().toISO(),
            }

            dispatch(addHabit(newHabit))
            router.push('/habits')
        }
    }, [days, dispatch, level, messages.emptyDaysError, messages.emptyNameError, router])

    useEffect(() => {
        if (name.current) {
            name.current.focus()
            name.current.onkeydown = ev => {
                if (ev.key === 'Enter') {
                    onCreate()
                }
            }
        }

        hotkeys('Enter', onCreate)
        // This should run just once, when the page loads
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className='p-2 h-screen flex flex-col justify-start'>
            <MyHead title='Create a new habit' />
            <div className='p-5 sm:flex justify-between items-center'>
                <h1 className='text-4xl mb-2 font-varela'>
                    <FormattedMessage id='newHabit' />
                </h1>
                <div className='grid grid-cols-2 gap-2'>
                    <Button
                        className='ml-auto'
                        color='light'
                        onClick={() => router.back()}
                    >
                        <ArrowLeftIcon className='h-7 w-7' />
                    </Button>
                    <Button
                        className='mr-auto'
                        onClick={onCreate}
                        color='primary'
                    >
                        <ArrowRightIcon className='h-6 w-6' />
                    </Button>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-2'>
                <span>
                    {messages.name.toString()}
                </span>
                <Input ref={name} Icon={PlusIcon} placeholder={messages.name.toString()} />

                <span>
                    {messages.difficulty.toString()}
                </span>
                <Select
                    value={level}
                    options={levelOptions}
                    onChange={setLevel as (v: string) => void}
                />

                <span>
                    {messages.days.toString()}
                </span>
                <WeekdayPicker days={days} onChange={setDays} />
            </div>

            {error ? (
                <Toast
                    title={messages.error.toString()}
                    body={error}
                    type='error'
                    onClose={() => setError('')}
                />
            ) : null}
        </section>
    )
}

export default New
