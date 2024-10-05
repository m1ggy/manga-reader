import { apiGet } from '@/lib/fetch'
import { MetaMangaResponse } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { debounce } from 'lodash-es'
import { useCallback, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Popover, PopoverAnchor, PopoverContent } from '../ui/popover'
import ItemPreview from './item-preview'
import Loader from './loader'

function Search() {
  const [show, setShow] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const debouncedSetSearchQuery = useCallback(
    debounce((value) => {
      setSearchQuery(value)
      if (!show) setShow(true)
    }, 500),
    [show],
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

  return (
    <Popover open={show} onOpenChange={setShow}>
      <PopoverAnchor asChild>
        <Input
          id='search'
          placeholder='Search'
          onChange={({ target: { value } }) => {
            debouncedSetSearchQuery(value)
            if (!value) {
              setShow(false)
            }
          }}
          type='search'
          ref={searchInputRef}
          onMouseEnter={() => {
            if (searchQuery && !show) setShow(true)
          }}
        />
      </PopoverAnchor>

      <PopoverContent
        className='overflow-auto lg:w-[40vw] max-h-[80vh] sm:w-full'
        onPointerDownOutside={(e) => {
          e.preventDefault()
          const clickedElement = e.target as HTMLElement
          if (clickedElement.id !== 'search') {
            setShow(false)
          }
        }}
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
        onFocusOutside={(e) => e.preventDefault()}
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
              <span className='text-sm font-semibold'>
                Found {data.results.length} matches
              </span>
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
        {(!isLoading && !data) ||
          (data && data?.results.length === 0 && (
            <div className='text-center w-full'>
              <span className='text-sm'>No found results.</span>
            </div>
          ))}
      </PopoverContent>
    </Popover>
  )
}

export default Search
