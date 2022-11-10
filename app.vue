<script setup lang="ts">
import { createFocusTrap } from 'focus-trap'

useHead({
  charset: 'utf-8',
  titleTemplate: title => `${title} | meeBlogs`,
  link: [{ rel: 'icon', href: '/logo.png' }],
})

onMounted(() => {
  const trap = createFocusTrap('body', { escapeDeactivates: false })
  trap.activate()
})
</script>

<template>
  <div class="relative">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
