import { useQuery } from '@tanstack/react-query'
import { apiGet } from '../fetch'
import { MetaMangaResponse } from '../types'

function useMangaList(type: string) {
  return useQuery({
    queryFn: () =>
      apiGet<MetaMangaResponse>(
        `anilist/advanced-search?type=MANGA&sort=["${type}_DESC"]`,
        'META',
      ),
    queryKey: [type, 'manga', 'list'],
  })
}

export default useMangaList
