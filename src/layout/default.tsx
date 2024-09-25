import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { PropsWithChildren } from 'react'

function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex gap-2 items-center lg:px-56 min-h-screen flex-col bg-background text-foreground pb-16 px-2'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default DefaultLayout
