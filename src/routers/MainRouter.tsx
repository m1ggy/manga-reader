import Browse from '@/pages/browse/browse'
import IndexPage from '@/pages/landing/landing'
import MangaPage from '@/pages/manga/manga'
import Reader from '@/pages/reader/reader'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    index: true,
    path: '/',
    element: <IndexPage />,
  },
  {
    index: true,
    path: '/browse',
    element: <Browse />,
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
