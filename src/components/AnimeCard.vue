<script setup lang="ts">
import { ref } from 'vue'
import type { Anime } from '../types/anime'

defineProps<{
  anime: Anime
}>()

const emit = defineEmits<{
  click: [anime: Anime]
}>()

const getYear = (anime: Anime): string => {
  if (anime.year) return anime.year.toString()
  if (anime.aired.from) {
    return new Date(anime.aired.from).getFullYear().toString()
  }
  return '?'
}
</script>

<template>
  <div
    @click="emit('click', anime)"
    class="group relative bg-zinc-900 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 border border-zinc-800 hover:border-purple-500/50"
  >
    <div class="aspect-3/4 overflow-hidden bg-zinc-800">
      <img
        :src="anime.images.jpg.large_image_url"
        :alt="anime.title"
        class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        :class="{ 'opacity-0': true }"
        loading="lazy"
        @load="(e) => (e.target as HTMLImageElement).classList.remove('opacity-0')"
      />
      <!-- Skeleton -->
      <div class="absolute inset-0 bg-zinc-800 animate-pulse skeleton-shimmer">
        <div class="absolute inset-0 bg-linear-to-r from-transparent via-zinc-700/50 to-transparent"></div>
      </div>
    </div>
    <div class="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div class="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
      <p class="text-xs sm:text-sm text-zinc-300 line-clamp-3 hidden sm:block">{{ anime.synopsis?.slice(0, 150) }}...</p>
    </div>
    <div class="p-2 sm:p-3">
      <h3 class="font-bold text-white text-xs sm:text-sm truncate group-hover:text-purple-400 transition-colors">{{ anime.title }}</h3>
      <p class="text-[10px] sm:text-xs text-zinc-400 mt-0.5 truncate">{{ anime.type }} · {{ anime.episodes || '?' }} eps · {{ getYear(anime) }}</p>
      <div class="flex items-center justify-between mt-1.5 sm:mt-2">
        <div class="flex items-center gap-1">
          <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span class="text-[10px] sm:text-xs text-zinc-400">{{ anime.score || 'N/A' }}</span>
        </div>
        <span class="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 sm:py-1 rounded-full bg-purple-500/20 text-purple-400 truncate max-w-[60px] sm:max-w-none">{{ anime.status }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-shimmer {
  position: relative;
  overflow: hidden;
}

.skeleton-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Hide skeleton when image is loaded */
img:not(.opacity-0) ~ .skeleton-shimmer {
  display: none;
}
</style>
