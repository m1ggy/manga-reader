type AltTitle = {
  [languageCode: string]: string
}

export interface Manga {
  id: string
  title: string
  altTitles: AltTitle[]
  description: string
  status: string
  releaseDate: number
  contentRating: string
  lastVolume: string
  lastChapter: string
  image: string
}

export interface SearchResponse {
  currentPage: number
  results: Manga[]
}

interface Description {
  [languageCode: string]: string
}

export interface Chapter {
  id: string
  title: string
  chapterNumber: string
  volumeNumber: string
  pages: number
}

export interface MangaInfo {
  id: string
  title: string
  altTitles: AltTitle[]
  description: Description
  genres: string[]
  themes: string[]
  status: string
  releaseDate: number
  chapters: Chapter[]
  image: string
}

export interface Page {
  img: string
  page: number
}

type MetaMangaTitle = {
  romaji: string
  english: string | null
  native: string
  userPreferred: string
}

export type MetaMangaChapter = {
  id: string
  title: string
  releaseDate: string
}
export type MetaManga = {
  id: string
  malId: number | null
  title: MetaMangaTitle
  status: 'Ongoing' | 'Completed'
  image: string
  imageHash: string
  cover: string | null
  coverHash: string
  popularity: number
  totalEpisodes: number | null
  currentEpisode: number | null
  countryOfOrigin: string
  description: string | null
  genres: string[]
  rating: number | null
  color: string | null
  type: 'MANGA' | 'NOVEL' | 'ONE_SHOT'
  releaseDate: number | null
  chapters: MetaMangaChapter[]
}

export type MetaMangaResponse = {
  currentPage: number
  hasNextPage: boolean
  totalPages: number
  totalResults: number
  results: MetaManga[]
}
