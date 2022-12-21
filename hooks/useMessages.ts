import { useRouter } from 'next/router'
import { useState } from 'react'

export function useMessages() {
    const { locale } = useRouter()

    const [messages, setMessages] = useState(null)
    const [loading, setLoading] = useState(true)

    import(`public/locales/${locale}.json`)
        .then(msg => {
            setMessages(msg)
            setLoading(false)
        })
        .catch(console.error)

    return { messages, loading }
}
