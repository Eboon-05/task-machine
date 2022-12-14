import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import {
    Square2StackIcon,
    PlusIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'

import { Task } from './Task'

import { useAppDispatch } from 'hooks'
import { removeGroup } from 'redux/slices/task'

const Group: FC<Group> = ({ name, color, id, list }) => {
    const dispatch = useAppDispatch()

    const onRemove = () => {
        dispatch(removeGroup(id))
    }

    return (
        <div className='group p-2 rounded-xl mb-6 animate__animated animate__fadeIn'>
            {/* Header of the group card */}
            <div className='flex justify-between items-center'>
                <div className='text-white text-2xl flex justify-start items-center'>
                    <Square2StackIcon className='h-6 w-6 mr-2' />
                    {name}
                </div>
                <div className='text-white flex items-center'>
                    <button onClick={onRemove}>
                        <TrashIcon className='h-6 w-6 mr-2' />
                    </button>
                    <Link href={`/new?group=${id}`}>
                        <PlusIcon className='h-6 w-6' />
                    </Link>
                </div>
            </div>

            {/* Task list */}
            <ul className='text-white pt-6'>
                {list
                    ? list.map(t => (
                          <li key={t.id} className='mb-6'>
                              <Task task={t} dark group={id} />
                          </li>
                      ))
                    : null}
                {list.length === 0 ? (
                    <div className='text-center'>
                        <Image
                            src='/dark/dancing.svg'
                            alt='dancing'
                            width={200}
                            height={200}
                            className='h-auto w-auto m-auto'
                        />
                        <p>This group is empty. Create a task!</p>
                    </div>
                ) : null}
            </ul>

            <style jsx>{`
                .group {
                    background-color: ${color};
                }
            `}</style>
        </div>
    )
}

export default Group
