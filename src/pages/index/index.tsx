import Header from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'

function IndexPage() {
  return (
    <div className='min-h-screen flex-col bg-zinc-950'>
      <Header />
      <Button>Hello World!</Button>
      <ModeToggle />
    </div>
  )
}

export default IndexPage
