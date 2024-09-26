import useMangaList from '@/lib/queries/getMangaList'
import Loader from '../globals/loader'
import MiniPreview from '../ui/mini-preview'

function GridList() {
  const { data, isLoading } = useMangaList('POPULARITY')
  return (
    <div>
      {isLoading ? (
        <div className='flex gap-2'>
          <Loader />
          Loading...
        </div>
      ) : data ? (
        <div className='grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
          {data.results.map((m) => (
            <MiniPreview data={m} key={m.id} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default GridList
