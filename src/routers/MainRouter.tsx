import IndexPage from '@/pages/index'
import MangaPage from '@/pages/index/manga'
import Reader from '@/pages/index/reader'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    index: true,
    path: '/',
    element: <IndexPage />,
  },
  {
    index: true,
    path: '/:id',
    element: <MangaPage />,
  },
  {
    index: true,
    path: '/:id/chapter/:chapterId',
    element: <Reader />,
  },
])

export default router
