const DEFAULT_API_URL = 'http://localhost:3001'

export function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_URL as string | undefined
  return (envUrl && envUrl.trim().length > 0 ? envUrl : DEFAULT_API_URL).replace(
    /\/$/,
    '',
  )
}

export class HttpError extends Error {
  status: number
  url: string

  constructor(message: string, status: number, url: string) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.url = url
  }
}

export async function fetchJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const url = `${getApiBaseUrl()}${path.startsWith('/') ? '' : '/'}${path}`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new HttpError(
      text || `Request failed with status ${res.status}`,
      res.status,
      url,
    )
  }

  return (await res.json()) as T
}

