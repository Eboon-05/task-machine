import classNames from 'classnames'
import Image from 'next/image'

import snowflake from 'public/icons/snowflake.svg'
import smile from 'public/icons/smile.svg'
import fire from 'public/icons/fire.svg'

export const getLevelIcon = (level: Task['level'], absolute?: boolean) => {
    const icons = [
        // Cold
        <span
            key={1}
            className={classNames({
                'p-3 rounded-2xl bg-light-blue flex justify-end items-center h-14 w-14':
                    true,
                'absolute top-[6px] left-[6px]': absolute,
            })}
        >
            <Image
                src={snowflake}
                alt='snowflake'
                width={24}
                height={24}
                className='mx-auto'
            />
        </span>,
        // Medium
        <span
            key={2}
            className={classNames({
                'p-3 rounded-2xl bg-light-orange flex justify-end items-center h-14 w-14':
                    true,
                'absolute top-[6px] left-[6px]': absolute,
            })}
        >
            <Image
                src={smile}
                alt='smile'
                width={24}
                height={24}
                className='mx-auto'
            />
        </span>,
        // Hot
        <span
            key={3}
            className={classNames({
                'p-3 rounded-2xl bg-light-red flex justify-end items-center h-14 w-14':
                    true,
                'absolute top-[6px] left-[6px]': absolute,
            })}
        >
            <Image
                src={fire}
                alt='fire'
                width={24}
                height={24}
                className='mx-auto'
            />
        </span>,
    ]

    return icons[level - 1]
}
