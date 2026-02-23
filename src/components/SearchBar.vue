<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  search: [query: string]
  'update:modelValue': [value: string]
}>()

const query = ref(props.modelValue || '')
const debounceTimer = ref<number | null>(null)

watch(() => props.modelValue, (newValue) => {
  query.value = newValue || ''
})

const performSearch = (immediate = false) => {
  // Clear previous timer
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }

  if (immediate) {
    emit('search', query.value)
  } else {
    // Set new timer for debounced search
    debounceTimer.value = setTimeout(() => {
      emit('search', query.value)
    }, 500) as unknown as number
  }
}

const clearSearch = () => {
  query.value = ''
  emit('update:modelValue', '')
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
  emit('search', '')
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    performSearch(true)
  }
}

watch(query, (newQuery, oldQuery) => {
  emit('update:modelValue', newQuery)
  // Only trigger search on empty if it was previously non-empty
  if (newQuery === '' && oldQuery !== '') {
    emit('search', '')
  } else if (newQuery !== '') {
    performSearch(false)
  }
})
</script>

<template>
  <div class="max-w-2xl mx-auto mb-4 sm:mb-8">
    <div class="flex gap-2">
      <div class="relative flex-1">
        <input
          v-model="query"
          type="text"
          placeholder="Search anime..."
          class="w-full px-4 py-3 sm:px-5 sm:py-4 pl-10 sm:pl-12 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
          @keydown="handleKeydown"
        />
        <svg class="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <button
          v-if="query"
          @click="clearSearch"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
        >
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <button
        @click="performSearch(true)"
        class="px-4 sm:px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors text-sm sm:text-base"
      >
        Search
      </button>
    </div>
  </div>
</template>
