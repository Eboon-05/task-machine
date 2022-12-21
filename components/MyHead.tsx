import Head from 'next/head'
import { FC } from 'react'
import { FormattedMessage } from 'react-intl'

interface Props {
    title?: string
}

const MyHead: FC<Props> = ({ title }) => {
    return (
        <Head>
            <meta charSet='utf-8' />
            <meta http-equiv='x-ua-compatible' content='ie=edge' />
            <meta
                name='viewport'
                content='width=device-width, height=device-height, viewport-fit=cover, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'
            />
            <meta name='mobile-web-app-capable' content='yes' />
            <meta name='apple-mobile-web-app-capable' content='yes' />
            <title>
                <FormattedMessage id={title} />
            </title>
        </Head>
    )
}

export default MyHead
