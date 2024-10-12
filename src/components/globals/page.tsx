import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Skeleton } from '../ui/skeleton'

type PageProps = {
  src: string
  onClick: () => void
  mangaId: string | number
  chapterId: string | number
}

function Page({ src, onClick, mangaId, chapterId }: PageProps) {
  const { data, isLoading } = useQuery<string>({
    queryFn: () =>
      new Promise((resolve) => {
        fetch(
          `${import.meta.env.VITE_BASE_API_URL}/utils/image-proxy?url=${src}&headers={"referer": "https://www.mangachows.com/${mangaId}/chapters/${chapterId}"}`,
        )
          .then((res) => res.blob())
          .then((blob) => {
            const url = URL.createObjectURL(blob)
            resolve(url)
          })
      }),
    queryKey: [src, 'page'],
  })

  useEffect(() => {
    return () => {
      if (data) {
        URL.revokeObjectURL(data)
      }
    }
  }, [])

  if (isLoading || !data)
    return (
      <div className='w-full'>
        <Skeleton className='rounded w-[70vh] h-[70vh]' />
      </div>
    )

  return (
    <div>
      <img
        src={data}
        className='w-full select-none'
        onContextMenu={(e) => e.preventDefault()}
        onClick={onClick}
      />
    </div>
  )
}

export default Page
