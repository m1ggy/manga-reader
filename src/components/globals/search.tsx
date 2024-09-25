import { apiGet } from '@/lib/fetch'
import { MetaMangaResponse } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { debounce } from 'lodash-es'
import { useCallback, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Popover, PopoverAnchor, PopoverContent } from '../ui/popover'
import ItemPreview from './item-preview'
import Loader from './loader'

function Search() {
  const [show, setShow] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const debouncedSetSearchQuery = useCallback(
    debounce((value) => {
      setSearchQuery(value)
    }, 500),
    [],
  )

  const { data, isLoading } = useQuery({
    queryFn: () =>
      apiGet<MetaMangaResponse>(
        `anilist/advanced-search?query=${searchQuery}&type=MANGA&sort=["POPULARITY_DESC"]`,
        'META',
      ),
    queryKey: [searchQuery, 'search'],
    enabled: Boolean(searchQuery),
  })

  useEffect(() => {
    if (!show && (data || isLoading)) {
      setShow(true)
    }
  }, [data, show, isLoading])

  return (
    <Popover open={show} onOpenChange={setShow}>
      <PopoverAnchor asChild>
        <Input
          placeholder='Search'
          onChange={({ target: { value } }) => debouncedSetSearchQuery(value)}
        />
      </PopoverAnchor>

      <PopoverContent
        className='overflow-auto lg:w-[40vw] max-h-[80vh] sm:w-full'
        onFocusOutside={() => setShow(false)}
      >
        <div className='flex flex-col gap-2 items-center justify-center'>
          {isLoading && (
            <div className='flex gap-2'>
              <Loader />
              <span className='text-sm'>Searching...</span>
            </div>
          )}
          {data?.results?.length ? (
            <div className='w-full'>
              <span className='text-sm font-semibold'>Result</span>
            </div>
          ) : null}
          {data?.results?.map((manga) => (
            <ItemPreview
              key={manga.id}
              data={manga}
              onClick={() => setShow(false)}
            />
          ))}
        </div>
        {!isLoading && data?.results.length === 0 && (
          <div className='text-center w-full'>
            <span className='text-sm'>No found results.</span>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default Search
