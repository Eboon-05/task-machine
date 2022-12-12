import Link from 'next/link'
import { FC } from 'react'

import { Square2StackIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Task } from './Task'

const Group: FC<Group> = ({ name, color, id, list }) => {
    return <div className='group p-2 rounded-xl mb-6'>

        {/* Header of the group card */}
        <div className='flex justify-between items-center'>
            <div className='text-white text-2xl flex justify-start items-center'>
                <Square2StackIcon className='h-6 w-6 mr-2' />
                {name}
            </div>
            <div className='text-white'>
                <Link href={`/new?group=${id}`}>
                    <PlusIcon className='h-6 w-6' />
                </Link>
            </div>
        </div>

        {/* Task list */}
        <ul className='text-white pt-6'>
            {list
                ? list.map(t => <li key={t.id} className='mb-6'>
                    <Task task={t} dark group={id} />
                </li>)
                : null
            }
        </ul>

        <style jsx>{`
            .group {
                background-color: ${color};
            }
        `}</style>
    </div>
}

export default Group
