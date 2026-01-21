import { Link, Outlet, useParams } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BlogListSkeleton } from '@/features/blogs/components/BlogListSkeleton'
import { useBlogsQuery } from '@/features/blogs/queries'
import { cn } from '@/lib/utils'

function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
}

export function BlogHomePage() {
  const { id } = useParams()
  const blogsQuery = useBlogsQuery()
  const blogs = blogsQuery.data ?? []

  return (
    <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground">
            Latest Articles
          </h2>
          <Button asChild size="sm">
            <Link to="/new">New Blog</Link>
          </Button>
        </div>

        {blogsQuery.isLoading ? (
          <BlogListSkeleton />
        ) : blogsQuery.isError ? (
          <Card>
            <CardHeader>
              <CardTitle>Couldn&apos;t load blogs</CardTitle>
              <CardDescription>
                {(blogsQuery.error as Error).message || 'Please try again.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => blogsQuery.refetch()} variant="outline">
                Retry
              </Button>
            </CardContent>
          </Card>
        ) : blogs.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No blogs yet</CardTitle>
              <CardDescription>Create the first one to get started.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link to="/new">Create blog</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {blogs.map((b) => {
              const selected = id === b.id
              return (
                <Link key={b.id} to={`/blogs/${b.id}`} className="block">
                  <Card
                    className={cn(
                      'transition hover:shadow-md',
                      selected && 'ring-2 ring-primary',
                    )}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                          {b.category.slice(0, 2).map((c) => (
                            <Badge key={c} variant="secondary">
                              {c}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{formatDate(b.date)}</span>
                      </div>
                      <CardTitle className="mt-2 line-clamp-2">{b.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{b.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </aside>

      <main className="pb-10">
        {id ? (
          <Outlet />
        ) : (
          <div className="rounded-xl border bg-card p-5">
            <div className="text-sm text-muted-foreground">
              Select a blog from the left to read it, or{' '}
              <Link className="text-primary underline underline-offset-4" to="/new">
                create a new one
              </Link>
              .
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

