import { useRouter } from 'next/router'
import Image from 'next/image'
import { FC, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'

import {
    Square2StackIcon,
    PlusIcon,
    TrashIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline'

import { Task } from './Task'

import { useAppDispatch } from 'hooks'
import { removeGroup } from 'redux/slices/task'
import { Button } from './Button'

import dancing from 'public/dark/dancing.svg'

const Group: FC<Group> = ({ name, id, list }) => {
    const dispatch = useAppDispatch()
    const { push } = useRouter()
    const [active, setActive] = useState(false)

    const onRemove = () => {
        dispatch(removeGroup(id))
    }

    return (
        <div
            className='group p-2 rounded-xl mb-6 animate__animated animate__fadeIn border-2 border-light-gray dark:border-dark-gray'
            id={id}
        >
            {/* Header of the group card */}
            <div className='flex justify-between items-center'>
                <div className='text-white text-2xl flex justify-start items-center'>
                    <Square2StackIcon className='h-6 w-6 mr-2' />
                    {name}
                </div>
                <div className='text-white flex items-center'>
                    <Button
                        className={classNames({
                            'transition-transform': true,
                            'rotate-180': active,
                        })}
                        onClick={() => setActive(!active)}
                    >
                        <ChevronDownIcon className='h-6 w-6' />
                    </Button>
                    <Button onClick={onRemove}>
                        <TrashIcon className='h-6 w-6 text-red' />
                    </Button>
                    <Button onClick={() => push(`/new?group=${id}`)}>
                        <PlusIcon className='h-6 w-6' />
                    </Button>
                </div>
            </div>

            {/* Task list */}
            {active ? (
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
                                src={dancing}
                                alt='dancing'
                                width={350}
                                height={350}
                                className='m-auto'
                                priority
                            />
                            <FormattedMessage id='emptyGroup' />
                        </div>
                    ) : null}
                </ul>
            ) : null}
        </div>
    )
}

export default Group
