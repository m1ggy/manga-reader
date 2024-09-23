import { apiGet } from '@/lib/fetch'
import { MetaMangaResponse } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import Loader from '../globals/loader'
import MiniPreview from '../ui/mini-preview'

type ListType = 'UPDATED_AT' | 'POPULARITY' | 'TRENDING'
type HorizontalListProps = {
  type: ListType
}

function HorizontalList({ type }: HorizontalListProps) {
  function getTitle(typeToGet: ListType) {
    switch (typeToGet) {
      case 'POPULARITY':
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
        `anilist/advanced-search?type=MANGA&sort=["${type}","SCORE_DESC", "POPULARITY_DESC"]`,
        'META',
      ),
    queryKey: [type, 'manga', 'list'],
  })

  console.log({ data, isLoading })

  const title = getTitle(type)

  return (
    <div>
      <span>{title}</span>
      {isLoading ? (
        <div className='flex justify-center'>
          <Loader />
        </div>
      ) : null}
      <div className='flex gap-2 overflow-auto py-2'>
        {data?.results.map((result) => (
          <MiniPreview data={result} key={result.id} />
        ))}
      </div>
    </div>
  )
}

export default HorizontalList
