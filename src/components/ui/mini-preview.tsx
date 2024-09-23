import { MetaManga } from '@/lib/types'
import { useNavigate } from 'react-router-dom'
import { Badge } from './badge'
import { Card, CardContent, CardHeader } from './card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card'

type MiniPreviewProps = {
  data: MetaManga
}
function MiniPreview({ data }: MiniPreviewProps) {
  const navigate = useNavigate()
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card
          className='min-w-40 h-64 cursor-pointer'
          onClick={() => navigate(`/${data.id}`)}
        >
          <CardHeader className='text-xs max-h-4 overflow-ellipsis'>
            {data.title.english}
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className='flex flex-col gap-2'>
          <span className='text-sm text-center'>{data.title.english}</span>
          <div>
            <Badge>#{data.popularity}</Badge>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default MiniPreview
