import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { FormattedMessage, useIntl } from 'react-intl'

import { useAppDispatch, useAppSelector } from 'hooks'

import { ArrowRightIcon, BellSlashIcon } from '@heroicons/react/24/outline'

import { setTasks } from 'redux/slices/task'
import { dark, light, reminderOff, reminderOn, toggleHabitReminder } from 'redux/slices/config'
import { setHabits } from 'redux/slices/habit'

import { Toast } from 'components/Toast'

export const Init: FC = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(s => s)
    const router = useRouter()

    const { messages } = useIntl()

    const [remember, setRemember] = useState<JSX.Element>(null)
    // Just a boolean for the second toast
    // after disabling habit reminder
    const [second, setSecond] = useState(false)

    // Set initial state
    useEffect(() => {
        // Get empty state
        const {
            task,
            config,
            habit: { habits },
        } = state

        // Get the local storage tasks,
        // groups and habits state
        const storageTask = JSON.parse(localStorage.getItem('tasks')) || {
            list: [],
            groups: [],
            habits: [],
        }

        // Get the local storage config
        const storageConfig = JSON.parse(localStorage.getItem('config')) || {}

        // If the state is different from the
        // one in localStorage, update it
        if (
            task.list !== storageTask.list ||
            task.groups !== storageTask.groups ||
            habits !== storageTask.habits
        ) {
            // Set tasks and groups
            dispatch(setTasks(storageTask))
            // Set habits
            dispatch(setHabits(storageTask))
        }

        // If storage theme is defined and state theme
        // is undefined
        if (
            config.dark === undefined &&
            typeof storageConfig.dark === 'boolean'
        ) {
            // Set storage theme as state theme
            dispatch(storageConfig.dark ? dark() : light())
        } else if (config.dark === undefined && storageConfig.dark === undefined) {
            // If there is no storage theme or state
            // theme (first time), detect the user theme
            const match = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches
            // Set the detected as the state theme
            dispatch(match ? dark() : light())
        }

        // If there is no habit reminder set
        // in config
        if (config.habitReminder === undefined) {
            if (typeof storageConfig.habitReminder === 'boolean') {
                // If there is a habit reminder config
                // in the storage, use it
                dispatch(storageConfig.habitReminder ? reminderOn() : reminderOff())
            } else if (storageConfig.habitReminder === undefined) {
                // If there is no habit reminder config,
                // default to "true"
                dispatch(reminderOn())
            }
        }

        // This effect must run just once, so
        // adding state to dependencies is useless
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    useEffect(() => {
        const {
            habit: { habits },
            config: { habitReminder },
        } = state

        if (habits && habitReminder) {
            
            const storageRem = localStorage.getItem('remember')
            const now = DateTime.now()

            if (DateTime.fromISO(storageRem).day !== now.day) {
                let count = 0

                for (const h of habits) {
                    if (h.days.includes(now.weekday - 1) && !h.done) {
                        count++
                    }
                }

                if (count > 0) {
                    setRemember(
                        <FormattedMessage id='reminderContent' values={{ count }} />,
                    )

                    localStorage.setItem('remember', now.toISO())
                }
            }
        }
    }, [state])

    return (
        <>
            {remember ? (
                <Toast
                    title={messages.reminderTitle.toString()}
                    body={remember}
                    confirmIcon={<ArrowRightIcon className='h-7 w-7' />}
                    onConfirm={() => router.push('/habits')}
                    onClose={() => setRemember(null)}
                    cancelIcon={<BellSlashIcon className='h-7 w-7' />}
                    onCancel={() => {
                        dispatch(toggleHabitReminder())
                        setSecond(true)
                    }}
                />
            ) : null}
            {second ? (
                <Toast
                    title={messages.disabled.toString()}
                    body={messages.reminderTurnOn.toString()}
                    onClose={() => setSecond(false)}
                />
            ) : null}
        </>
    )
}