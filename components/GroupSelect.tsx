import { FC, useMemo, useState } from 'react'
import classNames from 'classnames'

import { ChevronDownIcon, Square2StackIcon } from '@heroicons/react/24/solid'

import { useAppSelector } from 'hooks'

interface Props {
    group?: string
    onChange?: (group: string) => void
}

const GroupSelect: FC<Props> = ({ group, onChange }) => {
    const state = useAppSelector(s => s.task)

    const [active, setActive] = useState(false)
    const data = state.groups ? state.groups.find(g => g.id === group) : null

    if (data === null) return null

    return (
        <div
            className={classNames({
                [`
                    p-4 pl-16 border-2 border-light-gray outline-none rounded-xl w-full text-lg
                    relative cursor-pointer
                `]: true,
            })}
            onClick={() => setActive(!active)}
        >
            {data ? (
                <>
                    {/* The color sqare */}
                    <div
                        style={{ backgroundColor: data.color }}
                        className='absolute top-[6px] left-[6px] p-3 w-12 h-12 rounded-xl text-white'
                    >
                        <Square2StackIcon className='w-6 h-6' />
                    </div>

                    {/* The group name */}
                    {data.name}
                </>
            ) : (
                'No group'
            )}

            {/* The dropdown arrow */}
            <span
                className={classNames({
                    'absolute top-[6px] right-[6px] transition-transform p-3':
                        true,
                    'rotate-180': active,
                })}
            >
                <ChevronDownIcon className='h-6 w-6' />
            </span>

            {active ? (
                <ul className='absolute w-full shadow-md bg-white inset-x-0 rounded-xl top-[64px] z-10'>
                    <li
                        className='p-4 pl-16 w-full text-lg relative cursor-pointer'
                        onClick={() => {
                            onChange('')
                            setActive(false)
                        }}
                    >
                        <div className='absolute top-[6px] left-[6px] w-12 h-12 rounded-xl'></div>
                        No group
                    </li>

                    {state.groups
                        ? state.groups.map(g => {
                              return (
                                  <li
                                      key={g.id}
                                      className='p-4 pl-16 w-full text-lg relative cursor-pointer'
                                      onClick={() => {
                                          onChange(g.id)
                                          setActive(false)
                                      }}
                                  >
                                      <div
                                          style={{
                                              backgroundColor: g.color,
                                          }}
                                          className='absolute top-[6px] left-[6px] w-12 h-12 rounded-xl text-white p-3'
                                      >
                                          <Square2StackIcon className='w-6 h-6' />
                                      </div>

                                      {g.name}
                                  </li>
                              )
                          })
                        : null}
                </ul>
            ) : null}
        </div>
    )
}

export { GroupSelect }
