import { useState } from 'react'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import { Navbar } from 'components/Navbar'
import { SearchBar } from 'components/SearchBar'

const Habits = () => {
    const [searchActive, setSearchActive] = useState(false)

    return (
        <section className='p-2 h-screen flex flex-col justify-between'>
            {/* Page title */}
            <div className='p-5 flex justify-between items-center'>
                <h1 className='text-4xl font-bold'>Habits</h1>
                {/* Search button */}
                <button onClick={() => setSearchActive(true)}>
                    <MagnifyingGlassIcon className='h-7 w-7' />
                </button>{' '}
            </div>

            <Navbar />
            <SearchBar
                onClose={() => setSearchActive(false)}
                active={searchActive}
            />
        </section>
    )
}

export default Habits
