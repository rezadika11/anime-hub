<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Anime } from './types/anime'
import { getTopAnime, getSeasonalAnime, getUpcomingAnime, searchAnime } from './services/jikanApi'
import Header from './components/Header.vue'
import SearchBar from './components/SearchBar.vue'
import AnimeGrid from './components/AnimeGrid.vue'
import AnimeDetail from './components/AnimeDetail.vue'
import Pagination from './components/Pagination.vue'

const currentTab = ref('top')
const animeList = ref<Anime[]>([])
const loading = ref(true)
const selectedAnime = ref<Anime | null>(null)
const searchQuery = ref('')
const currentPage = ref(1)
const totalPages = ref(1)
const hasNextPage = ref(false)

const fetchAnime = async (page: number = 1) => {
  loading.value = true
  try {
    let data
    const limit = 24
    switch (currentTab.value) {
      case 'top':
        data = await getTopAnime(page, limit)
        break
      case 'seasonal':
        data = await getSeasonalAnime(undefined, undefined, page, limit)
        break
      case 'upcoming':
        data = await getUpcomingAnime(page, limit)
        break
      default:
        data = await getTopAnime(page, limit)
    }
    animeList.value = data.data
    totalPages.value = data.pagination.last_visible_page
    hasNextPage.value = data.pagination.has_next_page
    currentPage.value = page
    // Scroll to top after fetching new page
    if (page > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  } catch (error) {
    console.error('Error fetching anime:', error)
  } finally {
    loading.value = false
  }
}

const handleSearch = async (query: string) => {
  searchQuery.value = query
  if (!query.trim()) {
    currentPage.value = 1
    await fetchAnime(1)
    return
  }
  loading.value = true
  try {
    const data = await searchAnime(query, 1, 24)
    animeList.value = data.data
    totalPages.value = data.pagination.last_visible_page
    hasNextPage.value = data.pagination.has_next_page
    currentPage.value = 1
  } catch (error) {
    console.error('Error searching anime:', error)
  } finally {
    loading.value = false
  }
}

const handleSearchPageChange = async (page: number) => {
  if (!searchQuery.value.trim()) return
  loading.value = true
  try {
    const data = await searchAnime(searchQuery.value, page, 24)
    animeList.value = data.data
    totalPages.value = data.pagination.last_visible_page
    hasNextPage.value = data.pagination.has_next_page
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
    console.error('Error searching anime:', error)
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  if (searchQuery.value) {
    handleSearchPageChange(page)
  } else {
    fetchAnime(page)
  }
}

const handleTabChange = (tab: string) => {
  currentTab.value = tab
  searchQuery.value = ''
  currentPage.value = 1
  totalPages.value = 1
  hasNextPage.value = false
  fetchAnime(1)
}

const handleSelectAnime = (anime: Anime) => {
  selectedAnime.value = anime
}

const handleCloseDetail = () => {
  selectedAnime.value = null
}

onMounted(() => fetchAnime(1))
</script>

<template>
  <div class="min-h-screen bg-zinc-950">
    <Header :current-tab="currentTab" @change-tab="handleTabChange" />

    <main class="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <SearchBar
        v-model="searchQuery"
        @search="handleSearch"
      />

      <div v-if="searchQuery" class="mb-4 sm:mb-6">
        <h2 class="text-base sm:text-lg md:text-xl font-bold text-white">Search results for "{{ searchQuery }}"</h2>
        <p class="text-sm text-zinc-400 mt-1">Page {{ currentPage }} of {{ totalPages }}</p>
      </div>

      <AnimeGrid
        :anime-list="animeList"
        :loading="loading"
        @select="handleSelectAnime"
      />

      <Pagination
        v-if="!loading && animeList.length > 0"
        :current-page="currentPage"
        :total-pages="totalPages"
        :has-next-page="hasNextPage"
        @page-change="handlePageChange"
      />
    </main>

    <AnimeDetail
      :anime="selectedAnime"
      :loading="loading"
      @close="handleCloseDetail"
    />

    <footer class="text-center py-6 sm:py-8 text-zinc-600 text-xs sm:text-sm">
      <p>Data provided by <a href="https://jikan.moe" target="_blank" class="text-purple-400 hover:text-purple-300">Jikan API</a></p>
    </footer>
  </div>
</template>
