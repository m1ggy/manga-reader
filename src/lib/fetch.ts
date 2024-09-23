const MANGA_BASE = import.meta.env.VITE_API_URL
const META_BASE = import.meta.env.VITE_META_URL
type API_TYPE = 'META' | 'MANGA'

const handleResponse = async <K>(response: Response): Promise<K> => {
  if (response.ok) {
    try {
      return (await response.json()) as K
    } catch (parseError) {
      const errorText = await response.text()
      throw new Error(`Failed to parse JSON: ${errorText}`)
    }
  } else {
    const errorText = await response.text()
    throw new Error(
      `Request failed with status ${response.status}: ${errorText}`,
    )
  }
}

const handleError = (err: unknown): never => {
  if (err instanceof Error) {
    throw err
  }

  throw new Error('Unknown error occurred')
}

export function timeoutSignal(ms: number) {
  const abortController = new AbortController()
  setTimeout(() => abortController.abort(), ms)
  return abortController.signal
}

export async function apiFetch(
  uri: string,
  init?: RequestInit,
  type: API_TYPE = 'MANGA',
) {
  const BASE = type === 'MANGA' ? MANGA_BASE : type === 'META' ? META_BASE : ''
  const url = new URL(uri, BASE)
  const headers = new Headers(init?.headers)

  return await fetch(`${url}`, { ...init, headers })
}

export async function apiPost<T, K>(
  uri: string,
  body: T,
  type?: API_TYPE,
): Promise<K> {
  try {
    const request = await apiFetch(
      uri,
      {
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        signal: timeoutSignal(30_000),
      },
      type,
    )
    return await handleResponse<K>(request)
  } catch (err) {
    handleError(err)
    return Promise.reject(err)
  }
}

export async function apiGet<T>(
  uri: string,
  type?: API_TYPE,
): Promise<T | null> {
  try {
    const request = await apiFetch(
      uri,
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      },
      type,
    )
    return await handleResponse<T>(request)
  } catch (err) {
    throw err
  }
}

export async function apiDelete<T>(
  uri: string,
  type?: API_TYPE,
): Promise<T | null> {
  try {
    const request = await apiFetch(
      uri,
      {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
        signal: timeoutSignal(30_000),
      },
      type,
    )
    return await handleResponse<T>(request)
  } catch (err) {
    handleError(err)
    return Promise.reject(err)
  }
}
