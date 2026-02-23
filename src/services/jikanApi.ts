import type { Anime, AnimeResponse } from '../types/anime'

const BASE_URL = 'https://api.jikan.moe/v4'

export async function getTopAnime(page: number = 1, limit: number = 24): Promise<AnimeResponse> {
  const response = await fetch(`${BASE_URL}/top/anime?page=${page}&limit=${limit}`)
  if (!response.ok) throw new Error('Failed to fetch top anime')
  return response.json()
}

export async function getSeasonalAnime(year?: number, season?: string, page: number = 1, limit: number = 24): Promise<AnimeResponse> {
  let url = `${BASE_URL}/seasons/${year || 2024}/${season || 'winter'}?page=${page}&limit=${limit}`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch seasonal anime')
  return response.json()
}

export async function searchAnime(query: string, page: number = 1, limit: number = 24): Promise<AnimeResponse> {
  const response = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`)
  if (!response.ok) throw new Error('Failed to search anime')
  return response.json()
}

export async function getAnimeById(id: number): Promise<Anime> {
  const response = await fetch(`${BASE_URL}/anime/${id}/full`)
  if (!response.ok) throw new Error('Failed to fetch anime details')
  const data = await response.json()
  return data.data
}

export async function getUpcomingAnime(page: number = 1, limit: number = 24): Promise<AnimeResponse> {
  const response = await fetch(`${BASE_URL}/seasons/upcoming?page=${page}&limit=${limit}`)
  if (!response.ok) throw new Error('Failed to fetch upcoming anime')
  return response.json()
}
