import { NextPage } from 'next'
import Image from 'next/image'

import { Navbar } from 'components/Navbar'
import { useAppSelector } from 'hooks'

import Group from 'components/Group'

const Groups: NextPage = () => {
    const state = useAppSelector(s => s.task)

    return (
        <section className='p-2 h-screen flex flex-col justify-between'>
            <div>
                <div className='p-5'>
                    <h1 className='text-4xl font-bold'>Groups</h1>
                    <p>
                        {state.groups ? state.groups.length : 0} group
                        {state.groups
                            ? state.groups.length !== 1
                                ? 's'
                                : null
                            : null}
                    </p>
                </div>

                {state.groups ? (
                    <div>
                        {state.groups.map(g => (
                            <Group key={g.id} {...g} />
                        ))}
                    </div>
                ) : null}
            </div>

            {state.groups.length === 0 ? (
                <div className='text-center'>
                    <Image
                        src='/meditating.svg'
                        alt='meditating'
                        width={400}
                        height={400}
                        className='h-auto w-auto'
                    />
                    <p>
                        You haven't created any group yet. Separating your tasks
                        into groups can make things easier. Try creating a group
                        for work and another for pets!
                    </p>
                </div>
            ) : null}

            <Navbar />
        </section>
    )
}

export default Groups
