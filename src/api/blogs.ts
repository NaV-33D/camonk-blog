import { fetchJson } from '@/api/http'
import type { Blog, CreateBlogInput } from '@/types/blog'

export async function getBlogs() {
  return fetchJson<Blog[]>('/blogs')
}

export async function getBlogById(id: string) {
  return fetchJson<Blog>(`/blogs/${encodeURIComponent(id)}`)
}

export async function createBlog(input: CreateBlogInput) {
  return fetchJson<Blog>('/blogs', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

