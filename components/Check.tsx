import { ChangeEvent, FC } from 'react';
import classNames from 'classnames';

import { CheckIcon } from '@heroicons/react/20/solid';

interface Props {
    checked: boolean;
    onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
}

const Check: FC<Props> = ({ checked, onChange }) => {
    return (
        <>
            <div className='h-7 w-7 relative'>
                <input
                    type='checkbox'
                    checked={checked}
                    onChange={onChange}
                    className='absolute opacity-0 h-full w-full cursor-pointer z-[2]'
                />
                <span
                    className={classNames({
                        [`
                        absolute top-0 left-0 h-full w-full bg-transparent z-[1]
                        rounded-full border-2 border-black flex justify-center items-center
                    `]: true,
                        'bg-black': checked,
                    })}
                >
                    <CheckIcon
                        className={classNames({
                            'h-3 w-3 text-white font-bold': true,
                            hidden: !checked,
                        })}
                    />
                </span>
            </div>
        </>
    );
};

export { Check };
