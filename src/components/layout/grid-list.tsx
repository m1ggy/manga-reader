import useMangaList from '@/lib/queries/getMangaList'
import { useEffect, useRef } from 'react'
import PreviewSkeleton from '../globals/preview-skeleton'
import MiniPreview from '../ui/mini-preview'

function GridList() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    useMangaList('POPULARITY')
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current

        if (scrollTop + clientHeight >= scrollHeight * 0.9) {
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
    <div ref={containerRef} className='h-[80vh] overflow-y-auto'>
      {isLoading ? (
        <div className='grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
          {new Array(15).fill(null).map((_, i) => (
            <PreviewSkeleton key={i} />
          ))}
        </div>
      ) : data ? (
        <div className='grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
          {data?.pages.map((page) => {
            return page.results.map((result) => (
              <MiniPreview data={result} key={result.id} />
            ))
          })}
        </div>
      ) : null}
    </div>
  )
}

export default GridList
