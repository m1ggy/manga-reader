import clsx from 'clsx'
import { Skeleton } from '../ui/skeleton'

type PreviewSkeletonProps = {
  classNames?: string
}
function PreviewSkeleton({ classNames }: PreviewSkeletonProps) {
  return (
    <div className={clsx('flex flex-col gap-2', classNames)}>
      <Skeleton className='w-[160px] h-[256px]' />
      <Skeleton className='w-[160px] h-[16px]' />
    </div>
  )
}

export default PreviewSkeleton
