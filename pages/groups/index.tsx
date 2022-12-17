import { NextPage } from 'next'
import Image from 'next/image'

import { Navbar } from 'components/Navbar'
import { useAppSelector } from 'hooks'

import Group from 'components/Group'
import MyHead from 'components/MyHead'
import { Header } from 'components/Header'

const Groups: NextPage = () => {
    const {
        task,
        theme: { dark },
    } = useAppSelector(s => s)

    return (
        <section className='p-2 min-h-screen flex flex-col justify-between'>
            <MyHead title='Groups' />
            <div>
                <Header title='Groups' />

                {task.groups ? (
                    <div>
                        {task.groups.map(g => (
                            <Group key={g.id} {...g} />
                        ))}
                    </div>
                ) : null}
            </div>

            {task.groups?.length === 0 ? (
                <div className='text-center'>
                    <Image
                        src={dark ? '/dark/meditating.svg' : '/meditating.svg'}
                        alt='meditating'
                        width={400}
                        height={400}
                        className='h-auto w-auto sm:max-w-[400px] m-auto'
                    />
                    <p>
                        You haven&apos;t created any group yet. Separating your
                        tasks into groups can make things easier. Try creating a
                        group for work and another for pets!
                    </p>
                </div>
            ) : null}

            <Navbar />
        </section>
    )
}

export default Groups
