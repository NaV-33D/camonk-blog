import { Skeleton } from '@/components/ui/skeleton'

export function BlogDetailSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-56 w-full rounded-xl" />
      <Skeleton className="h-8 w-2/3" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-10/12" />
      <Skeleton className="h-4 w-9/12" />
    </div>
  )
}

