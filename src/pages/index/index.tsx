import HorizontalList from '@/components/layout/horizontal-list'
import DefaultLayout from '@/layout/default'

function IndexPage() {
  return (
    <DefaultLayout>
      <div className='flex flex-col gap-2 w-full'>
        <HorizontalList type='POPULARITY' />
        <HorizontalList type='TRENDING' />
        <HorizontalList type='UPDATED_AT' />
      </div>
    </DefaultLayout>
  )
}

export default IndexPage
