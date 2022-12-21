import { AppProps } from 'next/app'
import { Provider } from 'react-redux'

// import en from 'public/locales/en.json'
// import es from 'public/locales/es.json'

import { store } from 'redux/store'
import { Init } from 'components/Init'

import 'animate.css'
import 'react-tooltip/dist/react-tooltip.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <main className=' dark:bg-black dark:text-white'>
            <section className='font-roboto max-w-[768px] m-auto'>
                <Provider store={store}>
                    <Init />
                    <Component {...pageProps} />
                </Provider>
            </section>
        </main>
    )
}

export default MyApp
