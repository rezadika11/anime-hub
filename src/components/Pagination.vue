<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  hasNextPage: boolean
}>()

const emit = defineEmits<{
  pageChange: [page: number]
}>()

const pageNumbers = computed(() => {
  const pages = []
  const showPages = 5
  const totalPages = props.totalPages
  const currentPage = props.currentPage

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i)
      pages.push('...')
      pages.push(totalPages)
    } else if (currentPage >= totalPages - 2) {
      pages.push(1)
      pages.push('...')
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      pages.push(currentPage - 1)
      pages.push(currentPage)
      pages.push(currentPage + 1)
      pages.push('...')
      pages.push(totalPages)
    }
  }

  return pages
})
</script>

<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 sm:mt-8 pt-4 border-t border-zinc-800">
    <div class="text-sm text-zinc-400">
      Page <span class="text-white font-medium">{{ currentPage }}</span> of <span class="text-white font-medium">{{ totalPages }}</span>
    </div>

    <div class="flex items-center gap-1 sm:gap-2">
      <!-- First & Previous -->
      <button
        @click="emit('pageChange', 1)"
        :disabled="currentPage === 1"
        class="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 hover:text-white transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
        </svg>
      </button>
      <button
        @click="emit('pageChange', currentPage - 1)"
        :disabled="currentPage === 1"
        class="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 hover:text-white transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <!-- Page Numbers -->
      <div class="hidden sm:flex items-center gap-1">
        <button
          v-for="page in pageNumbers"
          :key="page"
          @click="typeof page === 'number' && emit('pageChange', page)"
          :disabled="page === '...'"
          :class="[
            'w-9 h-9 rounded-lg font-medium transition-colors',
            page === currentPage
              ? 'bg-purple-600 text-white'
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white',
            page === '...' && 'cursor-default opacity-50'
          ]"
        >
          {{ page }}
        </button>
      </div>

      <!-- Mobile Page Indicator -->
      <div class="sm:hidden text-sm text-zinc-400 px-3">
        {{ currentPage }} / {{ totalPages }}
      </div>

      <!-- Next & Last -->
      <button
        @click="emit('pageChange', currentPage + 1)"
        :disabled="!hasNextPage"
        class="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 hover:text-white transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      <button
        @click="emit('pageChange', totalPages)"
        :disabled="!hasNextPage"
        class="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 hover:text-white transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</template>
