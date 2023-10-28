'use client'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import store from '@/store/store'

const queryClient = new QueryClient()

const Providers = ({ children }) => {

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    {children}
                </Provider>
            </QueryClientProvider>
        </SessionProvider>
    )
}

export default Providers