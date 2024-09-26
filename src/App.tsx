import { ThemeProvider } from '@/components/theme-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import queryClient from './lib/queryClient'
import router from './routers/MainRouter'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
