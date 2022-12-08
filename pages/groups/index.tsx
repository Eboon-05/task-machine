import { NextPage } from 'next'

import { Navbar } from 'components/Navbar'
import { useAppSelector } from 'hooks'

import Group from 'components/Group'

const Groups: NextPage = () => {
    const state = useAppSelector(s => s.task)    

    return <section className='p-2 h-screen flex flex-col justify-between'>
        <div>

            <div className='p-5'>
                <h1 className='text-4xl font-bold'>Groups</h1>
                <p>
                    {state.groups ? state.groups.length : 0} {' '}
                    group{state.groups ? state.groups.length !== 1 ? 's' : null : null}
                </p>
            </div>

            {state.groups
                ? <div>
                    {state.groups.length
                        ? <>
                            {state.groups.map(g => <Group {...g} />)}
                        </>
                        : <>
                            There are no groups. You should create one.
                        </>
                    }
                </div>
                : null
            }

        </div>

        <Navbar />
    </section>
}

export default Groups
