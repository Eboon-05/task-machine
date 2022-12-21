import { NextPage } from 'next'
import Image from 'next/image'

import { Navbar } from 'components/Navbar'
import { useAppSelector } from 'hooks'

import Group from 'components/Group'
import MyHead from 'components/MyHead'
import { Header } from 'components/Header'
import { FormattedMessage } from 'react-intl'

const Groups: NextPage = () => {
    const {
        task,
        config: { dark },
    } = useAppSelector(s => s)

    return (
        <section className='p-2 min-h-screen flex flex-col justify-between'>
            <MyHead title='Groups' />
            <div>
                <Header title='groups' />

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
                        className='h-auto w-auto m-auto'
                        priority
                    />
                    <p>
                        <FormattedMessage id='noGroups' />
                    </p>
                </div>
            ) : null}

            <Navbar />
        </section>
    )
}

export default Groups
