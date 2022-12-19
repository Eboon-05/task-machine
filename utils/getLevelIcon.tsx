import classNames from 'classnames'
import Image from 'next/image'

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
                src='/icons/snowflake.svg'
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
                src='/icons/smile.svg'
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
                src='/icons/fire.svg'
                alt='fire'
                width={24}
                height={24}
                className='mx-auto'
            />
        </span>,
    ]

    return icons[level - 1]
}
