import { useRouter } from 'next/router'
import { FormattedMessage, useIntl } from 'react-intl'

import { ArrowLeftIcon } from '@heroicons/react/24/outline'

import MyHead from 'components/MyHead'
import { Switch } from 'components/Switch'
import { Button } from 'components/Button'

import { toggleHabitReminder, toggleTheme } from 'redux/slices/config'
import { useAppDispatch, useAppSelector } from 'hooks'

const Config = () => {
    const { back } = useRouter()
    const config = useAppSelector(s => s.config)
    const { dark, habitReminder } = config
    const dispatch = useAppDispatch()
    const { messages } = useIntl()

    return (
        <section className='p-2 min-h-screen'>
            <MyHead title={messages.config.toString()} />
            <div className='flex items-center p-5'>
                <Button color='light' onClick={back} className='mr-2'>
                    <ArrowLeftIcon className='h-7 w-7' />
                </Button>
                <span className='font-varela text-3xl'>
                    <FormattedMessage id='config' />
                </span>
            </div>

            {dark !== undefined && habitReminder !== undefined ? (
                <ul className='mt-3 px-6 flex flex-col items-center'>
                    <li className='flex justify-between items-center font-varela w-full sm:w-[500px] mb-6'>
                        <span className='text-lg font-bold'>
                            <FormattedMessage id='darkMode' />
                        </span>
                        <Switch
                            checked={dark}
                            onChange={() => dispatch(toggleTheme())}
                        />
                    </li>
                    <li className='flex justify-between items-center font-varela w-full sm:w-[500px] mb-6'>
                        <div className='max-w-[200px] sm:max-w-sm'>
                            <span className='text-lg font-bold'>
                                <FormattedMessage id='habitReminder' />
                            </span>
                            <p className='font-roboto'>
                                <FormattedMessage id='reminderDescription' />
                            </p>
                        </div>
                        <Switch
                            checked={habitReminder}
                            onChange={() => dispatch(toggleHabitReminder())}
                        />
                    </li>
                </ul>
            ) : null}
        </section>
    )
}

export default Config
