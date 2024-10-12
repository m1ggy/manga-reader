import { proxyImage } from '@/lib/utils'

type PageProps = {
  src: string
  onClick: () => void
  mangaId: string | number
  chapterId: string | number
}

function Page({ src, onClick, mangaId, chapterId }: PageProps) {
  return (
    <div>
      <img
        src={proxyImage(
          src,
          `https://www.mangachows.com/${mangaId}/chapters/${chapterId}`,
        )}
        className='w-full select-none'
        onContextMenu={(e) => e.preventDefault()}
        onClick={onClick}
      />
    </div>
  )
}

export default Page
