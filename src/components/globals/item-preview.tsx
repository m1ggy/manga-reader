import { Manga, MetaManga } from '@/lib/types'
import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import Loader from './loader'

type ItemPreviewProps = {
  data: MetaManga
  onClick?: (manga: Manga) => void
}
function ItemPreview({ data }: ItemPreviewProps) {
  const [loadingImage, setLoadingImage] = useState(true)
  useEffect(() => {
    setLoadingImage(true)
    const img = new Image()
    img.src = data.image
    img.onload = () => setLoadingImage(false)
  }, [data.image])
  return (
    <Card
      className='w-full cursor-pointer'
      onClick={() => {
        window.location.pathname = `/${data.id}`
      }}
    >
      <CardHeader>
        <CardTitle>{data.title.english || data.title.romaji}</CardTitle>
        <CardDescription className='truncate select-none'>
          {data.description}
        </CardDescription>
        {loadingImage ? (
          <div className='flex gap-2 '>
            <Loader />
            <p className='text-xs'>Loading image...</p>
          </div>
        ) : (
          <img src={data.image} alt={data.title.userPreferred} width={200} />
        )}
      </CardHeader>
      <CardContent>
        <span className='max-h-16 overflow-hidden overflow-ellipsis'>
          {data.status}
        </span>
      </CardContent>
      <CardFooter>
        <span>{data.releaseDate}</span>
      </CardFooter>
    </Card>
  )
}

export default ItemPreview
