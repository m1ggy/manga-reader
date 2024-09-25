import { apiGet } from '@/lib/fetch'
import { MetaMangaResponse } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import Loader from '../globals/loader'
import { Button } from '../ui/button'
import MiniPreview from '../ui/mini-preview'

type ListType = 'UPDATED_AT' | 'POPULARITY' | 'TRENDING' | 'SCORE'
type HorizontalListProps = {
  type: ListType
}

function HorizontalList({ type }: HorizontalListProps) {
  function getTitle(typeToGet: ListType) {
    switch (typeToGet) {
      case 'SCORE':
        return 'Most Popular'
      case 'UPDATED_AT':
        return 'Latest Updates'
      case 'TRENDING':
        return 'Hot'
    }
  }

  const { data, isLoading } = useQuery({
    queryFn: () =>
      apiGet<MetaMangaResponse>(
        `anilist/advanced-search?type=MANGA&sort=["${type}_DESC"]`,
        'META',
      ),
    queryKey: [type, 'manga', 'list'],
  })

  console.log({ data, isLoading })

  const title = getTitle(type)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const scroll = (direction: 'LEFT' | 'RIGHT') => {
    if (!containerRef.current) return null
    const scrollAmount = 300
    const currentScrollPosition = containerRef.current.scrollLeft
    const targetPosition =
      direction === 'RIGHT'
        ? currentScrollPosition + scrollAmount
        : currentScrollPosition - scrollAmount

    const scrollConfig: Record<string, string | number> = {
      behavior: 'smooth',
      left: targetPosition,
    }

    containerRef.current.scrollTo(scrollConfig)
  }

  const scrollToMax = (direction: 'LEFT' | 'RIGHT') => {
    if (!containerRef.current) return null
    const targetPosition =
      direction === 'RIGHT' ? containerRef.current.scrollWidth : 0

    const scrollConfig: Record<string, string | number> = {
      behavior: 'smooth',
      left: targetPosition,
    }

    containerRef.current.scrollTo(scrollConfig)
  }

  return (
    <div>
      <span>{title}</span>
      {isLoading ? (
        <div className='flex justify-center'>
          <Loader />
        </div>
      ) : (
        <div className='flex gap-2'>
          <div>
            <Button
              size={'icon'}
              className='h-full'
              variant={'outline'}
              onClick={() => scroll('LEFT')}
              onDoubleClick={() => scrollToMax('LEFT')}
            >
              <ChevronLeft />
            </Button>
          </div>
          <div
            className='overflow-auto py-12 flex gap-2 px-2'
            ref={containerRef}
          >
            <div className='flex gap-2 overflow-visible'>
              {data?.results.map((result) => (
                <MiniPreview data={result} key={result.id} />
              ))}
            </div>
          </div>
          <div className='flex items-center'>
            <Button
              size={'icon'}
              className='h-full'
              variant={'outline'}
              onClick={() => scroll('RIGHT')}
              onDoubleClick={() => scrollToMax('RIGHT')}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default HorizontalList
