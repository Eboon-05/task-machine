import { useRouter } from "next/router"

import { ArrowLeftIcon } from "@heroicons/react/24/outline"

import MyHead from "components/MyHead"
import { Switch } from "components/Switch"
import { Button } from "components/Button"

import { toggle } from "redux/slices/theme"
import { useAppDispatch, useAppSelector } from "hooks"

const Config = () => {
    const { back } = useRouter()
    const { dark } = useAppSelector(s => s.theme)
    const dispatch = useAppDispatch()

    return (
        <section className='p-2 min-h-screen'>
            <MyHead title="Config" />
            <div className="flex items-center p-5">
                <Button
                    color="light"
                    onClick={back}
                    className='mr-2'
                >
                    <ArrowLeftIcon className="h-7 w-7" />
                </Button>
                <span className="font-varela text-3xl">Configuration</span>
            </div>

            <ul className="mt-3 px-6 flex flex-col items-center">
                <li className="flex justify-between items-center font-varela w-full sm:w-[500px]">
                    <span>Dark mode</span>
                    <Switch checked={dark} onChange={() => dispatch(toggle())} />
                </li>
            </ul>
        </section>
    )
}

export default Config
