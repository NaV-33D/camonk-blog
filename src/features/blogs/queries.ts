import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createBlog, getBlogById, getBlogs } from '@/api/blogs'
import type { CreateBlogInput } from '@/types/blog'

export const blogKeys = {
  all: ['blogs'] as const,
  detail: (id: string) => ['blogs', id] as const,
}

export function useBlogsQuery() {
  return useQuery({
    queryKey: blogKeys.all,
    queryFn: getBlogs,
  })
}

export function useBlogQuery(id: string | undefined) {
  return useQuery({
    queryKey: id ? blogKeys.detail(id) : blogKeys.detail(''),
    queryFn: () => getBlogById(id!),
    enabled: Boolean(id),
  })
}

export function useCreateBlogMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateBlogInput) => createBlog(input),
    onSuccess: async (created) => {
      await qc.invalidateQueries({ queryKey: blogKeys.all })
      qc.setQueryData(blogKeys.detail(created.id), created)
    },
  })
}

