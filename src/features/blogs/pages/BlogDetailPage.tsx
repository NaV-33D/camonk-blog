import { Link, useParams } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BlogDetailSkeleton } from '@/features/blogs/components/BlogDetailSkeleton'
import { useBlogQuery } from '@/features/blogs/queries'

function formatDateTime(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
}

export function BlogDetailPage() {
  const { id } = useParams()
  const blogQuery = useBlogQuery(id)

  if (!id) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Missing blog id</CardTitle>
          <CardDescription>Please select a blog from the list.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="outline" size="sm">
          <Link to="/">Back</Link>
        </Button>
      </div>

      {blogQuery.isLoading ? (
        <BlogDetailSkeleton />
      ) : blogQuery.isError ? (
        <Card>
          <CardHeader>
            <CardTitle>Couldn&apos;t load blog</CardTitle>
            <CardDescription>
              {(blogQuery.error as Error).message || 'Please try again.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button onClick={() => blogQuery.refetch()} variant="outline">
              Retry
            </Button>
            <Button asChild>
              <Link to="/new">Create blog</Link>
            </Button>
          </CardContent>
        </Card>
      ) : blogQuery.isSuccess && blogQuery.data ? (
        <article className="space-y-4">
          {(() => {
            const blog = blogQuery.data
            return (
              <>
          <div className="overflow-hidden rounded-xl border bg-card">
            <div className="relative">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="h-56 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-balance text-2xl font-semibold text-white md:text-3xl">
                  {blog.title}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-white/90">
                  {blog.category.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium"
                    >
                      {c}
                    </span>
                  ))}
                  <span className="mx-1 text-white/60">•</span>
                  <span className="text-xs">{formatDateTime(blog.date)}</span>
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                {blog.category.slice(0, 3).map((c) => (
                  <Badge key={c} variant="secondary">
                    {c}
                  </Badge>
                ))}
                <span className="text-xs text-muted-foreground">{formatDateTime(blog.date)}</span>
              </div>
              <CardDescription className="mt-2 text-base text-foreground/80">
                {blog.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-neutral max-w-none whitespace-pre-line leading-relaxed dark:prose-invert">
                {blog.content}
              </div>
            </CardContent>
          </Card>
              </>
            )
          })()}
        </article>
      ) : null}
    </div>
  )
}

