import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import hotkeys from 'hotkeys-js'
import { FormattedMessage, useIntl } from 'react-intl'

import {
    ArrowRightIcon,
    ArrowLeftIcon,
    PlusIcon,
    CalendarIcon,
    Square2StackIcon,
} from '@heroicons/react/24/solid'

import { Button } from 'components/Button'
import { Input } from 'components/Input'

import { useAppDispatch, useAppSelector } from 'hooks'
import { addTask } from 'redux/slices/task'
import { Toast } from 'components/Toast'
import MyHead from 'components/MyHead'
import { Select } from 'components/Select'

const New: NextPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { groups } = useAppSelector(s => s.task)

    const [level, setLevel] = useState<'1' | '2' | '3'>('1')
    const [error, setError] = useState<string>('')

    const { messages } = useIntl()

    // Make an Option list based on the state groups
    const groupOptions: Option[] = useMemo(() => {
        if (groups && groups.length > 0) {
            const opts: Option[] = [
                {
                    name: messages.noGroup.toString(),
                    value: ''
                }
            ]

            if (groups) {
                groups.forEach(g => {
                    opts.push({
                        name: g.name,
                        value: g.id,
                        color: g.color,
                        icon: <Square2StackIcon className='h-6 w-6' />,
                    })
                })
            }

            return opts
        } else {
            return []
        }
    }, [groups, messages.noGroup])

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

    // State of the selected group using its ID
    // and sent to the Select as value
    const [group, setGroup] = useState(
        typeof router.query.group === 'string'
            ? groupOptions.find(g => g.value === router.query.group)?.value ||
                  (groups !== undefined && groups[0]?.id)
            : groups !== undefined && groups[0]?.id,
    )

    const name = useRef<HTMLInputElement>(null)
    const date = useRef<HTMLInputElement>(null)

    const onCreate = useCallback(() => {
        if (name.current && date.current) {
            if (!name.current.value) {
                return setError(`Task name can't be empty.`)
            }

            const newDate = DateTime.fromISO(date.current.value).toFormat(
                'dd/MM/yyyy',
            )

            const newTask: Task = {
                id: nanoid(),
                createdAt: DateTime.now().toISO(),
                name: name.current.value,
                level: parseInt(level) as Task['level'],
                done: false,
                due: date.current.value ? newDate : undefined,
            }

            if (group) {
                dispatch(
                    addTask({
                        task: newTask,
                        group: group,
                    }),
                )
                router.push(`/groups#${group}`)
            } else {
                dispatch(addTask({ task: newTask }))
                router.push('/')
            }
        }
    }, [dispatch, level, group, router])

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
            <MyHead title={messages.newTask.toString()} />
            <div className='p-5 sm:flex justify-between items-center'>
                <h1 className='text-4xl mb-2 font-varela'>
                    <FormattedMessage id='newTask' />
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
                    <FormattedMessage id='name' />
                </span>
                <Input
                    ref={name}
                    Icon={PlusIcon}
                    placeholder={messages.name.toString()}
                />

                <span>
                    <FormattedMessage id='date' />
                </span>
                <Input ref={date} Icon={CalendarIcon} type='date' />
                <span className='text-sm opacity-60'>
                    <FormattedMessage id='emptyDate' />
                </span>

                <span>
                    <FormattedMessage id='difficulty' />
                </span>
                <Select
                    value={level}
                    options={levelOptions}
                    onChange={setLevel as (v: string) => void}
                />

                {groups?.length > 0 ? (
                    <>
                        <span>
                            <FormattedMessage id='group' />
                        </span>
                        <Select
                            options={groupOptions}
                            value={group}
                            onChange={setGroup}
                        />
                    </>
                ) : null}
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
