import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useCreateBlogMutation } from '@/features/blogs/queries'

function splitCategories(raw: string) {
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

export function NewBlogPage() {
  const navigate = useNavigate()
  const createMutation = useCreateBlogMutation()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [categoryRaw, setCategoryRaw] = useState('FINANCE')
  const [content, setContent] = useState('')

  const categories = useMemo(() => splitCategories(categoryRaw), [categoryRaw])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    await createMutation.mutateAsync({
      title: title.trim(),
      description: description.trim(),
      coverImage: coverImage.trim(),
      category: categories.length ? categories : ['GENERAL'],
      content,
      date: new Date().toISOString(),
    })

    const created = createMutation.data
    if (created) navigate(`/blogs/${created.id}`)
    else navigate('/')
  }

  const canSubmit =
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    coverImage.trim().length > 0 &&
    content.trim().length > 0 &&
    !createMutation.isPending

  return (
    <div className="mx-auto max-w-2xl pb-10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Button asChild variant="outline" size="sm" className="rounded-full">
          <Link to="/">Back</Link>
        </Button>
      </div>

      <Card className="rounded-2xl border bg-card/90 shadow-soft">
        <CardHeader>
          <CardTitle>Create a new blog</CardTitle>
          <CardDescription>
            Share your perspective in plain text — no HTML formatting required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="title">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Future of Fintech"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="description">
                Description
              </label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short summary of the blog..."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="categories">
                  Categories
                </label>
                <Input
                  id="categories"
                  value={categoryRaw}
                  onChange={(e) => setCategoryRaw(e.target.value)}
                  placeholder="FINANCE, TECH"
                />
                <div className="text-xs text-muted-foreground">
                  Comma-separated, e.g. <span className="font-mono">FINANCE, TECH</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="coverImage">
                  Cover image URL
                </label>
                <Input
                  id="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://images.pexels.com/..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="content">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write the full blog content..."
                className="min-h-56 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {createMutation.isError ? (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                {(createMutation.error as Error).message || 'Failed to create blog.'}
              </div>
            ) : null}

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <Button type="submit" disabled={!canSubmit}>
                {createMutation.isPending ? 'Creating…' : 'Create blog'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

