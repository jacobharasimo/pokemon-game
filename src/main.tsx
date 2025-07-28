import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './app.tsx'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
        },
    },
})

const theme = createTheme({
    typography:{
        fontFamily: '"Press Start 2P", monospace',
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    components:{
        MuiButton: {
            variants:[
                {
                    props: {
                        variant: 'outlined',
                    },
                    style: () =>({
                        color: '#0f380f',
                        border: '1px solid #0f380f',
                        backgroundColor: '#8bac0f',
                        ':hover': {
                            border: '1px solid #0f380f',
                        }
                    })
                }
            ]
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)