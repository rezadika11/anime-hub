<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Anime } from '../types/anime'

const props = defineProps<{
  anime: Anime | null
  loading: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const imageLoaded = ref(false)
const imageError = ref(false)

watch(() => props.anime, () => {
  imageLoaded.value = false
  imageError.value = false
})

const getScoreColor = (score: number) => {
  if (score >= 9) return 'text-green-400'
  if (score >= 8) return 'text-emerald-400'
  if (score >= 7) return 'text-yellow-400'
  if (score >= 6) return 'text-orange-400'
  return 'text-red-400'
}

const handleImageLoad = () => {
  imageLoaded.value = true
}

const handleImageError = () => {
  imageError.value = true
  imageLoaded.value = true
}
</script>

<template>
  <Teleport to="body">
    <Transition
      name="modal"
      :css="true"
    >
      <div
        v-if="anime"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        @click.self="emit('close')"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/90 sm:bg-black/80 modal-backdrop"></div>

        <!-- Modal Content -->
        <div class="modal-content relative bg-zinc-900 sm:rounded-2xl w-full sm:max-w-4xl sm:max-h-[90vh] h-[90vh] sm:h-auto overflow-y-auto border-t sm:border border-zinc-800 shadow-2xl">
          <!-- Close Button -->
          <button
            @click="emit('close')"
            class="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-800/90 hover:bg-zinc-700 flex items-center justify-center transition-colors"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Header Image -->
          <div class="relative">
            <div class="h-48 sm:h-64 md:h-80 overflow-hidden bg-zinc-800">
              <img
                v-if="!imageError"
                :src="anime.images.jpg.large_image_url"
                :alt="anime.title"
                class="w-full h-full object-cover transition-opacity duration-300"
                :class="{ 'opacity-0': !imageLoaded, 'opacity-100': imageLoaded }"
                loading="eager"
                @load="handleImageLoad"
                @error="handleImageError"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-zinc-600">
                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div class="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
            </div>

            <!-- Title Section -->
            <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div class="flex-1">
                  <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white">{{ anime.title }}</h2>
                  <p v-if="anime.title_english" class="text-base sm:text-lg text-zinc-400 mt-1 line-clamp-1">{{ anime.title_english }}</p>
                  <p v-if="anime.title_japanese" class="text-xs sm:text-sm text-zinc-500 mt-1 line-clamp-1">{{ anime.title_japanese }}</p>
                </div>
                <div class="flex items-center gap-2 sm:gap-3">
                  <div class="flex items-center gap-2 bg-zinc-800/90 rounded-lg px-3 py-2">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span :class="['text-lg sm:text-xl font-bold', getScoreColor(anime.score)]">{{ anime.score || 'N/A' }}</span>
                  </div>
                  <span class="text-xs px-2 sm:px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 whitespace-nowrap">{{ anime.status }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <!-- Genres -->
            <div class="flex flex-wrap gap-2">
              <span v-for="genre in anime.genres" :key="genre.mal_id" class="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                {{ genre.name }}
              </span>
            </div>

            <!-- Info Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              <div class="bg-zinc-800/50 rounded-lg p-2 sm:p-3">
                <p class="text-[10px] sm:text-xs text-zinc-500">Type</p>
                <p class="text-sm sm:font-semibold text-white truncate">{{ anime.type || '-' }}</p>
              </div>
              <div class="bg-zinc-800/50 rounded-lg p-2 sm:p-3">
                <p class="text-[10px] sm:text-xs text-zinc-500">Episodes</p>
                <p class="text-sm sm:font-semibold text-white">{{ anime.episodes || '?' }}</p>
              </div>
              <div class="bg-zinc-800/50 rounded-lg p-2 sm:p-3">
                <p class="text-[10px] sm:text-xs text-zinc-500">Duration</p>
                <p class="text-sm sm:font-semibold text-white truncate">{{ anime.duration || '-' }}</p>
              </div>
              <div class="bg-zinc-800/50 rounded-lg p-2 sm:p-3">
                <p class="text-[10px] sm:text-xs text-zinc-500">Rating</p>
                <p class="text-sm sm:font-semibold text-white truncate">{{ anime.rating || '-' }}</p>
              </div>
            </div>

            <!-- Synopsis -->
            <div v-if="anime.synopsis">
              <h3 class="text-base sm:text-lg font-bold text-white mb-2">Synopsis</h3>
              <p class="text-sm sm:text-base text-zinc-300 leading-relaxed">{{ anime.synopsis }}</p>
            </div>

            <!-- Background -->
            <div v-if="anime.background">
              <h3 class="text-base sm:text-lg font-bold text-white mb-2">Background</h3>
              <p class="text-sm sm:text-base text-zinc-400 leading-relaxed">{{ anime.background }}</p>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
              <div>
                <p class="text-zinc-500 text-[10px] sm:text-xs">Rank</p>
                <p class="text-white text-sm sm:text-base">#{{ anime.rank || '-' }}</p>
              </div>
              <div>
                <p class="text-zinc-500 text-[10px] sm:text-xs">Popularity</p>
                <p class="text-white text-sm sm:text-base">#{{ anime.popularity || '-' }}</p>
              </div>
              <div>
                <p class="text-zinc-500 text-[10px] sm:text-xs">Members</p>
                <p class="text-white text-sm sm:text-base">{{ anime.members?.toLocaleString() || '-' }}</p>
              </div>
              <div>
                <p class="text-zinc-500 text-[10px] sm:text-xs">Favorites</p>
                <p class="text-white text-sm sm:text-base">{{ anime.favorites?.toLocaleString() || '-' }}</p>
              </div>
            </div>

            <!-- MAL Link -->
            <div class="pt-3 sm:pt-4 border-t border-zinc-800">
              <a
                :href="anime.url"
                target="_blank"
                class="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium text-sm sm:text-base"
              >
                <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                View on MyAnimeList
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Smooth animations with GPU acceleration */
.modal-backdrop {
  will-change: opacity;
}

.modal-content {
  will-change: transform, opacity;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: translateY(100%) scale(0.95);
}

@media (min-width: 640px) {
  .modal-enter-from .modal-content,
  .modal-leave-to .modal-content {
    transform: scale(0.95);
  }
}

/* Enable smooth scrolling */
.modal-content {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Prevent layout shift */
.modal-content > * {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
</style>
