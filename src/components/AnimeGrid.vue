<script setup lang="ts">
import type { Anime } from '../types/anime'
import AnimeCard from './AnimeCard.vue'

defineProps<{
  animeList: Anime[]
  loading: boolean
}>()

const emit = defineEmits<{
  select: [anime: Anime]
}>()
</script>

<template>
  <div v-if="loading" class="grid grid-cols-6 gap-2 sm:gap-3 md:gap-4">
    <div v-for="i in 12" :key="i" class="aspect-3/4 bg-zinc-800 rounded-lg sm:rounded-xl animate-pulse"></div>
  </div>
  <div v-else-if="animeList.length === 0" class="text-center py-16 sm:py-20">
    <svg class="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-zinc-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <p class="text-zinc-400 text-base sm:text-lg">No anime found</p>
  </div>
  <div v-else class="grid grid-cols-6 gap-2 sm:gap-3 md:gap-4">
    <AnimeCard
      v-for="anime in animeList"
      :key="anime.mal_id"
      :anime="anime"
      @click="emit('select', anime)"
    />
  </div>
</template>
