import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import DefaultLayout from '@/layout/default'
import { apiGet } from '@/lib/fetch'
import { MetaManga } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

function MangaPage() {
  const params = useParams<Record<'id', string>>()

  const { data, isLoading } = useQuery({
    queryFn: () => apiGet<MetaManga>(`anilist-manga/info/${params.id}`, 'META'),
    queryKey: [params.id, 'manga-info'],
  })
  const navigate = useNavigate()

  return (
    <DefaultLayout>
      {isLoading ? (
        <div className='w-full'>
          <Skeleton className='w-full h-[90vh] flex flex-col gap-2 p-5'>
            <Skeleton className='w-1/2 h-10' />
            <div className='flex justify-center'>
              <Skeleton className='w-[250px] h-[350px]' />
            </div>
            <Skeleton className='w-1/3 h-10' />
            <div className='flex gap-2'>
              <Skeleton className='w-24 h-6' />
              <Skeleton className='w-24 h-6' />
              <Skeleton className='w-24 h-6' />
              <Skeleton className='w-24 h-6' />
            </div>
            <Skeleton className='w-full h-64' />
            <Skeleton className='w-1/3 h-10' />
            <div className='flex flex-col gap-1'>
              <Skeleton className='w-1/4 h-6' />
              <Skeleton className='w-1/4 h-6' />
              <Skeleton className='w-1/4 h-6' />
              <Skeleton className='w-1/4 h-6' />
              <Skeleton className='w-1/4 h-6' />
              <Skeleton className='w-1/4 h-6' />
              <Skeleton className='w-1/4 h-6' />
            </div>
          </Skeleton>
        </div>
      ) : null}

      {data ? (
        <Card>
          <CardHeader className='flex flex-col gap-4'>
            <CardTitle className='text-3xl'>{data?.title.english}</CardTitle>
            <div className='flex justify-center'>
              <img
                src={data.image}
                alt={data.title.english || data.title.userPreferred}
                width={250}
              />
            </div>
            <CardDescription className='flex gap-1'>
              <Badge>Release Date: {data.releaseDate}</Badge>
              <Badge>Status: {data.status}</Badge>
            </CardDescription>
            <CardDescription className='flex gap-1 flex-col'>
              <span>Genres</span>
              <span className='flex gap-1'>
                {data.genres.map((genre) => (
                  <Badge key={genre}>{genre}</Badge>
                ))}
              </span>
            </CardDescription>
            <CardDescription>
              {data?.description ?? 'No description provided.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <span>Chapters</span>
              <div className='flex flex-col gap-3 max-h-[60vh] overflow-auto'>
                {data.chapters.map((chapter, index) => (
                  <div
                    className='flex flex-col gap-2 select-none cursor-pointer hover:bg-zinc-800 w-fit p-2 rounded-sm'
                    key={chapter.id}
                    onClick={() => navigate(`chapter/${chapter.id}`)}
                  >
                    <span>
                      {index + 1}. {chapter.title || `Chapter ${index + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </DefaultLayout>
  )
}

export default MangaPage
