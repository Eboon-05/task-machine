import Image from 'next/image'

export const getLevelIcon = (level: Task['level'], absolute?: boolean) => {
    const icons = [
        // Cold
        <span className='p-3 rounded-xl bg-light-blue'>
            <Image src='/icons/snowflake.svg' alt='snowflake' width={24} height={24} />
        </span>,
        // Medium
        <span className='p-3 rounded-xl bg-light-orange'>
            <Image src='/icons/smile.svg' alt='smile' width={24} height={24} />
        </span>,
        // Hot
        <span className='p-3 rounded-xl bg-light-red'>
            <Image src='/icons/fire.svg' alt='fire' width={24} height={24} />
        </span>,
    ]

    const iconsAbsolute = [
        // Cold
        <span className='absolute top-[6px] left-[6px] p-3 rounded-xl bg-light-blue'>
            <Image src='/icons/snowflake.svg' alt='snowflake' width={24} height={24} />
        </span>,
        // Medium
        <span className='absolute top-[6px] left-[6px] p-3 rounded-xl bg-light-orange'>
            <Image src='/icons/smile.svg' alt='smile' width={24} height={24} />
        </span>,
        // Hot
        <span className='absolute top-[6px] left-[6px] p-3 rounded-xl bg-light-red'>
            <Image src='/icons/fire.svg' alt='fire' width={24} height={24} />
        </span>,
    ]
    
    return absolute
        ? iconsAbsolute[level - 1]
        : icons[level - 1]
}