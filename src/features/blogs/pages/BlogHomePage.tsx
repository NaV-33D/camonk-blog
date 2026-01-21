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
    <div className="grid min-h-[calc(100vh-72px)] grid-cols-1 gap-5 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Latest Articles
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Browse curated articles on finance, careers, and technology.
            </p>
          </div>
          <Button asChild size="sm" className="shrink-0">
            <Link to="/new">New Blog</Link>
          </Button>
        </div>

        <div className="rounded-2xl border bg-card/80 p-3 shadow-soft backdrop-blur-sm">
          {blogsQuery.isLoading ? (
            <BlogListSkeleton />
          ) : blogsQuery.isError ? (
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-sm">Couldn&apos;t load blogs</CardTitle>
                <CardDescription>
                  {(blogsQuery.error as Error).message || 'Please try again.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <Button onClick={() => blogsQuery.refetch()} variant="outline" size="sm">
                  Retry
                </Button>
              </CardContent>
            </Card>
          ) : blogs.length === 0 ? (
            <Card className="border-dashed bg-muted/40">
              <CardHeader>
                <CardTitle className="text-base">No blogs yet</CardTitle>
                <CardDescription>Create the first one to get started.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild size="sm">
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
                        'border-none bg-background/80 transition hover:-translate-y-0.5 hover:bg-background hover:shadow-md',
                        selected && 'ring-2 ring-primary',
                      )}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-1.5">
                            {b.category.slice(0, 2).map((c) => (
                              <Badge key={c} variant="secondary">
                                {c}
                              </Badge>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(b.date)}
                          </span>
                        </div>
                        <CardTitle className="mt-2 line-clamp-2 text-sm">
                          {b.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-xs">
                          {b.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </aside>

      <main className="pb-6">
        {id ? (
          <Outlet />
        ) : (
          <Card className="h-full rounded-2xl border-dashed bg-card/70 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Welcome to the CA Monk Blog</CardTitle>
              <CardDescription>
                Pick an article from the list to start reading, or share your own insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                Use the left panel to quickly scan through categories, titles, and descriptions. On
                larger screens, the selected article will open here for a focused reading
                experience.
              </p>
              <p className="mt-3">
                Want to contribute?{' '}
                <Link
                  className="font-medium text-primary underline underline-offset-4"
                  to="/new"
                >
                  Create a new blog
                </Link>{' '}
                with plain text content—no HTML required.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

