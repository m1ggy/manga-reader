import { MetaManga } from '@/lib/types'
import clsx from 'clsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from './badge'
import { Card, CardContent } from './card'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

type MiniPreviewProps = {
  data: MetaManga
}
function MiniPreview({ data }: MiniPreviewProps) {
  const navigate = useNavigate()
  const [elementState, setElementState] = useState<string | null>(null)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const isHovering = elementState === 'hovering'
  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Card
          onMouseEnter={() => {
            setElementState('hovering')
            setPopoverOpen(true)
          }}
          onMouseLeave={() => {
            setElementState(null)
          }}
          className={clsx(
            'min-w-40 h-64 cursor-pointer flex items-center transition-all',
            isHovering && 'scale-110',
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
                className={clsx('w-full transition-all')}
                width={50}
              />
            </div>
            <div>
              <p
                className={clsx(
                  'text-xs text-ellipsis overflow-hidden text-center max-h-5 transition-all',
                  isHovering && 'max-h-16',
                )}
              >
                {data.title.english ?? data.title.romaji}
              </p>
            </div>
          </CardContent>
        </Card>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col gap-1'>
        <span className='text-sm font-bold'>
          {data.title.english ?? data.title.romaji}
        </span>
        <div className='flex gap-1'>
          <Badge>{data.countryOfOrigin}</Badge>
          <Badge>#{data.popularity}</Badge>
          {data.rating ? <Badge>{data.rating}/100</Badge> : null}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default MiniPreview
