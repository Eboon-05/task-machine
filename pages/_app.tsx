import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'

// import en from 'public/locales/en.json'
// import es from 'public/locales/es.json'

import { store } from 'redux/store'
import { Init } from 'components/Init'

import 'animate.css'
import 'react-tooltip/dist/react-tooltip.css'
import '../styles/globals.css'

import { useMessages } from 'hooks/useMessages'

function MyApp({ Component, pageProps }: AppProps) {
    const { locale, defaultLocale } = useRouter()

    const { messages, loading } = useMessages()

    return (
        <main className=' dark:bg-black dark:text-white'>
            <section className='font-roboto max-w-screen-md m-auto'>
                <Provider store={store}>
                    {!loading && messages ? (
                        <IntlProvider locale={locale} messages={messages} defaultLocale={defaultLocale}>
                            <Init />
                            <Component {...pageProps} />
                        </IntlProvider>
                    ) : null}
                </Provider>
            </section>
        </main>
    )
}

export default MyApp
