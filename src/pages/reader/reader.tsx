import Loader from '@/components/globals/loader'
import ChapterPage from '@/components/globals/page'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ReaderLayout from '@/layout/reader-layout'
import { apiGet } from '@/lib/fetch'
import type { MetaManga, Page } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Reader() {
  const navigate = useNavigate()
  const params = useParams<Record<'id' | 'chapterId', string>>()

  const { data: mangaInfo, isLoading: mangaInfoLoading } = useQuery({
    queryFn: () => apiGet<MetaManga>(`anilist-manga/info/${params.id}`, 'META'),
    queryKey: [params.id, 'manga-info'],
  })

  const { data, isLoading } = useQuery({
    queryFn: () =>
      apiGet<Page[]>(
        `anilist-manga/read?chapterId=${params.chapterId}`,
        'META',
      ),
    queryKey: [params.chapterId, 'manga-chapter'],
    enabled: Boolean(params.chapterId),
  })

  const chapter = useMemo(() => {
    if (mangaInfo) {
      return mangaInfo.chapters.find((c) => c.id === params.chapterId)
    }
  }, [mangaInfo, params])

  const chapterNumber = useMemo(() => {
    if (!mangaInfo) return -1
    return mangaInfo.chapters.findIndex((c) => c.id == params.chapterId) + 1
  }, [mangaInfo, params.chapterId])

  const hasNextButton = useMemo(() => {
    if (mangaInfoLoading) return false
    if (!mangaInfo) return false
    if (!chapter) return false

    const index = mangaInfo.chapters.findIndex((c) => c.id == params.chapterId)

    return Boolean(mangaInfo.chapters[index + 1])
  }, [mangaInfo, mangaInfoLoading, params, chapter])
  const hasPrevButton = useMemo(() => {
    if (mangaInfoLoading) return false
    if (!mangaInfo) return false
    if (!chapter) return false
    const index = mangaInfo.chapters.findIndex((c) => c.id == params.chapterId)

    return Boolean(mangaInfo.chapters[index - 1])
  }, [mangaInfoLoading, mangaInfo, chapter])

  const buttons = useMemo(() => {
    if (isLoading || mangaInfoLoading) return null

    return chapter ? (
      <div className='flex gap-4 items-center'>
        {hasPrevButton ? (
          <Button
            variant={'outline'}
            onClick={() =>
              (window.location.href = `/${mangaInfo?.id}/chapter/${mangaInfo?.chapters[chapterNumber - 2].id}`)
            }
          >
            Previous{' '}
          </Button>
        ) : (
          <Button
            onClick={() => navigate(`/${mangaInfo?.id}`)}
            variant={'outline'}
          >
            Details
          </Button>
        )}
        <span className='text-sm font-semibold'>Chapter {chapterNumber}</span>
        {hasNextButton ? (
          <Button
            variant={'outline'}
            onClick={() =>
              (window.location.href = `/${mangaInfo?.id}/chapter/${mangaInfo?.chapters[chapterNumber].id}`)
            }
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={() => navigate(`/${mangaInfo?.id}`)}
            variant={'outline'}
          >
            Details
          </Button>
        )}
      </div>
    ) : null
  }, [
    hasNextButton,
    hasPrevButton,
    chapter,
    isLoading,
    navigate,
    mangaInfoLoading,
  ])

  const scroll = (direction: 'up' | 'down') => {
    const scrollAmount = 1000

    const targetPosition =
      direction === 'down'
        ? window.scrollY + scrollAmount
        : window.scrollY - scrollAmount

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    })
  }

  const chapterSelection = useMemo(() => {
    if (!mangaInfo) return null

    return (
      <div className='lg:w-64'>
        <Select
          value={chapter?.id}
          onValueChange={(value) =>
            (window.location.href = `/${mangaInfo?.id}/chapter/${value}`)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Select chapter' />
          </SelectTrigger>
          <SelectContent>
            {mangaInfo.chapters.map((chap) => (
              <SelectItem value={chap.id} key={chap.id}>
                {chap.title || chap.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }, [mangaInfo, chapter])

  return (
    <ReaderLayout>
      {mangaInfo ? (
        <span className='text-lg font-semibold'>{mangaInfo.title.english}</span>
      ) : null}

      {chapterSelection}
      {buttons}
      {data && data?.length ? (
        <div className='flex flex-col items-center lg:px-[10vw] w-full'>
          {data.map((i, index) => (
            <ChapterPage
              src={i.img}
              onClick={() => scroll('down')}
              key={index}
              mangaId={mangaInfo?.id as string}
              chapterId={chapter?.id as string}
            />
          ))}
        </div>
      ) : null}
      {isLoading || mangaInfoLoading ? (
        <div className='flex gap-2'>
          <Loader /> Loading chapter...
        </div>
      ) : null}
      {buttons}
    </ReaderLayout>
  )
}

export default Reader
