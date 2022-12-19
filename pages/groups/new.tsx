import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import hotkeys from 'hotkeys-js'

import {
    ArrowLeftIcon,
    ArrowRightIcon,
    PlusIcon,
    SwatchIcon,
} from '@heroicons/react/24/solid'

import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Toast } from 'components/Toast'
import MyHead from 'components/MyHead'
import { Select } from 'components/Select'

import { useAppDispatch } from 'hooks'
import { addGroup } from 'redux/slices/task'

const New: NextPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const name = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string>('')

    const colors: Option[] = [
        {
            name: '#e63946',
            value: '#e63946',
            color: '#e63946',
            icon: <SwatchIcon className='h-6 w-6' />,
        },
        {
            name: '#1d3557',
            value: '#1d3557',
            color: '#1d3557',
            icon: <SwatchIcon className='h-6 w-6' />,
        },
        {
            name: '#ff5678',
            value: '#ff5678',
            color: '#ff5678',
            icon: <SwatchIcon className='h-6 w-6' />,
        },
        {
            name: '#2a9d8f',
            value: '#2a9d8f',
            color: '#2a9d8f',
            icon: <SwatchIcon className='h-6 w-6' />,
        },
        {
            name: '#5a189a',
            value: '#5a189a',
            color: '#5a189a',
            icon: <SwatchIcon className='h-6 w-6' />,
        },
        {
            name: '#000000',
            value: '#000000',
            color: '#000000',
            icon: <SwatchIcon className='h-6 w-6' />,
        },
        {
            name: '#22577a',
            value: '#22577a',
            color: '#22577a',
            icon: <SwatchIcon className='h-6 w-6' />,
        },
    ]

    const [color, setColor] = useState(colors[0].value)

    const onCreate = useCallback(() => {
        if (name.current) {
            if (!name.current.value) {
                return setError(`Group name can't be empty.`)
            }

            const newGroup: Group = {
                id: nanoid(),
                name: name.current.value,
                color,
                list: [],
            }

            dispatch(addGroup(newGroup))
            router.push('/groups')
        }
    }, [color, dispatch, router])

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
            <MyHead title='Create a new group' />
            <div className='p-5 sm:flex justify-between items-center'>
                <h1 className='text-4xl mb-2 font-varela'>
                    Create a new group
                </h1>
                <div className='grid grid-cols-2 gap-2'>
                    <Button
                        className='p-0'
                        color='light'
                        onClick={() => router.back()}
                    >
                        <ArrowLeftIcon className='h-7 w-7' />
                    </Button>
                    <Button
                        className='m-auto sm:m-0'
                        onClick={onCreate}
                        color='primary'
                    >
                        <ArrowRightIcon className='h-6 w-6' />
                    </Button>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-2'>
                <span>Name:</span>
                <Input
                    ref={name}
                    Icon={PlusIcon}
                    placeholder='Group name'
                    autoFocus
                />

                <span>Color:</span>
                <Select value={color} onChange={setColor} options={colors} />
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
