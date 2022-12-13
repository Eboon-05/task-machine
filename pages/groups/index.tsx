import { NextPage } from 'next'
import Image from 'next/image'

import { Navbar } from 'components/Navbar'
import { useAppSelector } from 'hooks'

import Group from 'components/Group'
import MyHead from 'components/MyHead'
import { Header } from 'components/Header'

const Groups: NextPage = () => {
    const state = useAppSelector(s => s.task)

    return (
        <section className='p-2 h-screen flex flex-col justify-between'>
            <MyHead title='Groups' />
            <div>
                <Header title='Groups' />

                {state.groups ? (
                    <div>
                        {state.groups.map(g => (
                            <Group key={g.id} {...g} />
                        ))}
                    </div>
                ) : null}
            </div>

            {state.groups?.length === 0 ? (
                <div className='text-center'>
                    <Image
                        src='/meditating.svg'
                        alt='meditating'
                        width={400}
                        height={400}
                        className='h-auto w-auto sm:max-w-[400px] m-auto'
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
