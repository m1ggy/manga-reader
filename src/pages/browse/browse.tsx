import GridList from '@/components/layout/grid-list'
import DefaultLayout from '@/layout/default'

function Browse() {
  return (
    <DefaultLayout>
      <div className='text-left w-full'>
        <span className='text-sm'>Sort</span>
      </div>

      <GridList />
    </DefaultLayout>
  )
}

export default Browse
