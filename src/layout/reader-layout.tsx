import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { PropsWithChildren } from 'react'
import DefaultLayout from './default'

function ReaderLayout({ children }: PropsWithChildren) {
  const scrollToTop = () => window.scrollTo({ top: 1 })
  const scrollToBottom = () =>
    window.scrollTo({ top: document.documentElement.scrollHeight })

  return (
    <DefaultLayout>
      <div className='relative'>
        <div className='flex flex-col gap-2 items-center'>{children}</div>
        <div className='fixed right-5 bottom-1 transform -translate-y-1/3 flex flex-col gap-2'>
          <Button size='icon' variant='outline' onClick={scrollToTop}>
            <ChevronUp />
          </Button>
          <Button size='icon' variant='outline' onClick={scrollToBottom}>
            <ChevronDown />
          </Button>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default ReaderLayout
