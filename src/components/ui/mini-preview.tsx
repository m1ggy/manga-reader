import { MetaManga } from '@/lib/types'
import clsx from 'clsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Flag from '../globals/flag'
import { Badge } from './badge'
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
        <div
          onMouseEnter={() => {
            setElementState('hovering')
            setPopoverOpen(true)
          }}
          onMouseLeave={() => {
            setElementState(null)
            setPopoverOpen(false)
          }}
          className={clsx(
            'w-40 h-80 cursor-pointer flex items-center transition-all justify-center duration-300',
            isHovering && 'scale-105',
          )}
          onClick={() => navigate(`/${data.id}`)}
          onContextMenu={() => {
            setElementState('hovering')
            setPopoverOpen(true)
          }}
        >
          <div>
            <div className='h-fit flex justify-center'>
              <img
                src={data.image}
                alt={
                  data.title.english ??
                  data.title.native ??
                  data.title.userPreferred
                }
                className={clsx('transition-all h-64 object-cover')}
              />
            </div>
            <div>
              <p
                className={clsx(
                  'text-xs text-ellipsis overflow-hidden text-centertransition-all line-clamp-1',
                  isHovering && 'line-clamp-3',
                )}
              >
                {data.title.english ?? data.title.romaji}
              </p>
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col gap-1' align='end'>
        <span className='text-sm font-bold'>
          {data.title.english ?? data.title.romaji}
        </span>
        <div className='flex gap-1 flex-wrap'>
          <Flag countryOfOrigin={data.countryOfOrigin} />
          <Badge variant={'outline'}>#{data.popularity}</Badge>
          {data.rating ? (
            <Badge variant={'outline'}>{data.rating}%</Badge>
          ) : null}
          <Badge>{data.status}</Badge>
        </div>
        <div className='flex gap-1 flex-wrap'>
          {data.genres.map((genre, i) => (
            <Badge key={i} variant={'secondary'}>
              {genre}
            </Badge>
          ))}
        </div>
        <div>
          <span>{data.currentEpisode}</span>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default MiniPreview
