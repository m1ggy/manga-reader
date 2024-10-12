import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function proxyImage(url: string, referrer = window.location.origin) {
  referrer
  //DISABLE PROXY FOR NOW
  // return `${import.meta.env.VITE_BASE_API_URL}/utils/image-proxy?url=${url}&headers={"referer": "${referrer}"}`
  return url
}
