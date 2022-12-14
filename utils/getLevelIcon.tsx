import classNames from 'classnames'
import Image from 'next/image'

export const getLevelIcon = (level: Task['level'], absolute?: boolean) => {
    const icons = [
        // Cold
        <span key={1} className={classNames({
            'p-3 rounded-xl bg-light-blue': true,
            'absolute top-[6px] left-[6px]': absolute
        })}>
            <Image src='/icons/snowflake.svg' alt='snowflake' width={24} height={24} />
        </span>,
        // Medium
        <span key={2} className={classNames({
            'p-3 rounded-xl bg-light-orange': true,
            'absolute top-[6px] left-[6px]': absolute
        })}>
            <Image src='/icons/smile.svg' alt='smile' width={24} height={24} />
        </span>,
        // Hot
        <span key={3} className={classNames({
            'p-3 rounded-xl bg-light-red': true,
            'absolute top-[6px] left-[6px]': absolute
        })}>
            <Image src='/icons/fire.svg' alt='fire' width={24} height={24} />
        </span>,
    ]
    
    return icons[level - 1]
}