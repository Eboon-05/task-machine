import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'

import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/solid'

import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Toast } from 'components/Toast'

import { useAppDispatch } from 'hooks'
import { addGroup } from 'redux/taskSlice'
import { ColorPicker } from 'components/ColorPicker'
import MyHead from 'components/MyHead'

const New: NextPage = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const name = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string>('')
    const [color, setColor] = useState('#e63946')

    const onCreate = () => {
        if (name.current) {
            if (!name.current.value) {
                return setError(`Group name can't be empty.`)
            }

            const newGroup: Group = {
                id: nanoid(),
                name: name.current.value,
                color,
                list: []
            }

            dispatch(addGroup(newGroup))
            router.push('/groups')
        }
    }

    return (
        <section className='p-2 h-screen flex flex-col justify-start'>
            <MyHead title='Create a new group' />
            <div className='p-5 sm:flex justify-between items-center'>
                <h1 className='text-4xl mb-2 font-varela'>Create a new group</h1>
                <Button className='m-auto sm:m-0' onClick={onCreate}>
                    <ArrowRightIcon className='h-6 w-6' />
                </Button>
            </div>
            <div className='grid grid-cols-1 gap-2'>
                <span>Name:</span>
                <Input ref={name} Icon={PlusIcon} placeholder='Group name' />

                <span>Color:</span>
                <ColorPicker onChange={setColor} />
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
