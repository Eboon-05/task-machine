import Head from 'next/head'
import { FC } from 'react'

interface Props {
    title?: string
}

const MyHead: FC<Props> = ({ title }) => {
    return <Head>
        <title>{title}{title ? ' - ' : ''}Task Machine</title>
    </Head>
}

export default MyHead
