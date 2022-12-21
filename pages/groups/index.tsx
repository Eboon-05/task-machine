import { NextPage } from 'next'
import Image from 'next/image'
import { FormattedMessage, useIntl } from 'react-intl'

import { Navbar } from 'components/Navbar'
import { useAppSelector } from 'hooks'

import Group from 'components/Group'
import MyHead from 'components/MyHead'
import { Header } from 'components/Header'

import meditating from 'public/meditating.svg'
import meditatingDark from 'public/dark/meditating.svg'

const Groups: NextPage = () => {
    const {
        task,
        config: { dark },
    } = useAppSelector(s => s)
    const { messages } = useIntl()

    return (
        <section className='p-2 min-h-screen flex flex-col justify-between'>
            <MyHead title={messages.groups.toString()} />
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
                        src={dark ? meditatingDark : meditating}
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
