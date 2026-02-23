<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  currentTab: string
}>()

const emit = defineEmits<{
  changeTab: [tab: string]
}>()

const isOpen = ref(false)

const tabs = [
  { id: 'top', label: 'Top', icon: '🏆' },
  { id: 'seasonal', label: 'Seasonal', icon: '📺' },
  { id: 'upcoming', label: 'Upcoming', icon: '🔜' },
]

const handleTabClick = (tabId: string) => {
  emit('changeTab', tabId)
  isOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur-lg border-b border-zinc-800">
    <div class="max-w-7xl mx-auto px-3 sm:px-4 py-3">
      <div class="flex items-center justify-between">
        <h1 class="text-xl sm:text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          AnimeHub
        </h1>

        <!-- Desktop Nav -->
        <nav class="hidden sm:flex gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="emit('changeTab', tab.id)"
            :class="[
              'px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm',
              currentTab === tab.id
                ? 'bg-purple-600 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            ]"
          >
            <span class="hidden md:inline">{{ tab.icon }}</span>
            <span class="md:ml-2">{{ tab.label }}</span>
          </button>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          @click="isOpen = !isOpen"
          class="sm:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <svg v-if="!isOpen" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <Transition name="slide">
        <nav v-if="isOpen" class="sm:hidden mt-3 pb-2">
          <div class="flex flex-col gap-2">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="handleTabClick(tab.id)"
              :class="[
                'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left',
                currentTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              ]"
            >
              <span class="text-xl">{{ tab.icon }}</span>
              <span>{{ tab.label }}</span>
            </button>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
