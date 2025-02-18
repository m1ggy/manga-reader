import { useInfiniteQuery } from '@tanstack/react-query'
import { apiGet } from '../fetch'
import { MetaMangaResponse } from '../types'

function useMangaList(type: string) {
  return useInfiniteQuery({
    queryKey: ['manga', 'list', type],
    queryFn: ({ pageParam = 1 }) =>
      apiGet<MetaMangaResponse>(
        `anilist/advanced-search?type=MANGA&sort=["${type}_DESC"]&page=${pageParam}&provider=mangadex`,
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
}

export default useMangaList
