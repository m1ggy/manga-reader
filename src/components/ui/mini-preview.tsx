import { MetaManga } from '@/lib/types'
import clsx from 'clsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from './card'

type MiniPreviewProps = {
  data: MetaManga
}
function MiniPreview({ data }: MiniPreviewProps) {
  const navigate = useNavigate()
  const [elementState, setElementState] = useState<string | null>(null)

  return (
    <Card
      onMouseEnter={() => setElementState('hovering')}
      onMouseLeave={() => setElementState(null)}
      className={clsx(
        'min-w-40 h-64 cursor-pointer flex items-center transition-all',
        elementState === 'hovering' && 'scale-110',
      )}
      onClick={() => navigate(`/${data.id}`)}
    >
      <CardContent className='flex flex-col items-center justify-center'>
        <div>
          <img
            src={data.image}
            alt={
              data.title.english ??
              data.title.native ??
              data.title.userPreferred
            }
            height={50}
          />
        </div>
        <div>
          <p className='text-xs text-ellipsis overflow-hidden text-center max-h-5'>
            {data.title.english ?? data.title.romaji}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default MiniPreview
