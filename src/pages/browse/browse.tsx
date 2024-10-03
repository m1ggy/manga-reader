import Sort from '@/components/globals/sort'
import GridList from '@/components/layout/grid-list'
import DefaultLayout from '@/layout/default'

function Browse() {
  return (
    <DefaultLayout>
      <div className='text-left w-full'>
        <Sort />
      </div>

      <GridList />
    </DefaultLayout>
  )
}

export default Browse
