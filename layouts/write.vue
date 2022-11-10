<script lang="ts" setup>
import { useUrl } from '~/composables/url'

const user = useSupabaseUser()
</script>

<template>
  <div class="p-4 bg-light-200 min-h-screen w-full flex flex-col">
    <div class="max-w-screen-lg mx-auto w-full">
      <nav class="flex justify-between items-center">
        <NuxtLink to="/">
          <Logo class="w-8 h-8" />
        </NuxtLink>

        <div class="flex items-center">
          <Command class="mr-4" />
          <NuxtLink v-if="!user" rel="noopener" :to="`${useUrl}/login`">
            Login
          </NuxtLink>
          <div>
            <NuxtImg
              v-if="user?.user_metadata?.avatar_url"
              class="w-8 h-8 rounded-full"
              :src="user?.user_metadata?.avatar_url"
              :alt="user?.user_metadata?.full_name"
            />
          </div>
        </div>
      </nav>

      <div class="min-h-screen">
        <slot />
      </div>

      <Footer />
    </div>
  </div>
</template>
