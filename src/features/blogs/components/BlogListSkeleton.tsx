import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function BlogListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="mt-2 h-5 w-4/5" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

