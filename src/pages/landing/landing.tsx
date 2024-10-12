import FeatureRequestDialog from '@/components/globals/feature-request-dialog'
import HorizontalList from '@/components/layout/horizontal-list'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import DefaultLayout from '@/layout/default'
import { PawPrint } from 'lucide-react'

function IndexPage() {
  return (
    <DefaultLayout>
      <Alert>
        <PawPrint className='h-4 w-4' />
        <AlertTitle>Hey there friend!</AlertTitle>
        <AlertDescription>
          Mangachows is still actively being developed! for feature requests,
          please fill up{' '}
          <FeatureRequestDialog
            trigger={
              <Badge className='underline text-sm' variant={'secondary'}>
                this
              </Badge>
            }
          />{' '}
          form.
        </AlertDescription>
      </Alert>
      <div className='flex flex-col gap-2 w-full'>
        <HorizontalList type='TRENDING' />
        <HorizontalList type='SCORE' />
        {/* <HorizontalList type='UPDATED_AT' /> */}
      </div>
    </DefaultLayout>
  )
}

export default IndexPage
