import IndexPage from '@/pages/index'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    index: true,
    path: '/',
    element: <IndexPage />,
  },
])

export default router
