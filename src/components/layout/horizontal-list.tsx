import { apiGet } from '@/lib/fetch'
import { MetaMangaResponse } from '@/lib/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import Loader from '../globals/loader'
import { Button } from '../ui/button'
import { Card, CardContent, CardTitle } from '../ui/card'
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

  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ['manga', 'list', type],
      queryFn: ({ pageParam = 1 }) =>
        apiGet<MetaMangaResponse>(
          `anilist/advanced-search?type=MANGA&sort=["${type}_DESC"]&page=${pageParam}`,
          'META',
        ),
      getNextPageParam: (lastPage) => {
        if (lastPage.hasNextPage) {
          return lastPage.currentPage + 1
        }
        return undefined
      },
      initialPageParam: 1,
    })

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

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current

        // Check if we've scrolled near the end (e.g., 90% of max scroll)
        if (scrollLeft + clientWidth >= scrollWidth * 0.9) {
          if (hasNextPage && !isFetching) {
            fetchNextPage()
          }
        }
      }
    }

    const scrollableElement = containerRef.current

    if (scrollableElement) {
      scrollableElement.addEventListener('scroll', handleScroll)
    }

    // Cleanup the event listener on unmount
    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [fetchNextPage, hasNextPage, isFetching])

  return (
    <Card className='p-6 gap-2 flex flex-col'>
      <CardTitle>
        {' '}
        <span>{title}</span>
      </CardTitle>
      <CardContent className='p-0'>
        <div>
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
                  variant={'ghost'}
                  onClick={() => scroll('LEFT')}
                  onDoubleClick={() => scrollToMax('LEFT')}
                >
                  <ChevronLeft />
                </Button>
              </div>
              <div
                className='overflow-auto md:py-5 flex gap-2 px-2'
                ref={containerRef}
              >
                <div className='flex gap-2 overflow-visible'>
                  {data?.pages.map((page) => {
                    return page.results.map((result) => (
                      <MiniPreview data={result} key={result.id} />
                    ))
                  })}
                </div>
              </div>
              <div className='flex items-center'>
                <Button
                  size={'icon'}
                  className='h-full'
                  variant={'ghost'}
                  onClick={() => scroll('RIGHT')}
                  onDoubleClick={() => scrollToMax('RIGHT')}
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default HorizontalList
