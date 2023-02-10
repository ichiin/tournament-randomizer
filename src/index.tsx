import { QueryClient, QueryClientProvider } from 'react-query'

import { App } from 'containers'
import { I18nextProvider } from 'react-i18next'
import React from 'react'
import ReactDOM from 'react-dom/client'
import i18n from 'utils/i18n'
import reportWebVitals from './reportWebVitals'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
                <App />
            </I18nextProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
