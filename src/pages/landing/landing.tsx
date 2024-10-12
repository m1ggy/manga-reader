import FeatureRequestDialog from '@/components/globals/feature-request-dialog'
import HorizontalList from '@/components/layout/horizontal-list'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import DefaultLayout from '@/layout/default'
import { PawPrint } from 'lucide-react'
import Helmet from 'react-helmet'
function IndexPage() {
  return (
    <DefaultLayout>
      <Helmet titleTemplate='%s | Mangachows'>
        <title>Home</title>
        <meta name='description' content='Home page for mangachows.com' />
        <meta
          name='keywords'
          content='Manga,One Piece, Jujutsu Kaisen, Manhwa, free manhwa, free manga, bleach, demon slayer'
        />
        <link rel='canonical' href={window.location.origin} />
        <meta property='og:title' content='Mangachows' />
        <meta property='og:description' content='Read manga in Mangachows!' />
        <meta property='og:image' content='/icon.ico' />
        <meta property='og:url' content={window.location.origin} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Mangachows' />
        <meta name='twitter:description' content='Read manga in Mangachows!' />
        <meta name='twitter:image' content='/icon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Helmet>
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
