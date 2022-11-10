<script setup lang="ts">
import { set } from '@vueuse/core'
import type { Profiles } from '~/utils/types'

const client = useSupabaseClient()
const subdomain = useSubdomain()
const profile = useSubdomainProfile()

// this should fetch user's profiles and settings (if any)
useAsyncData('profile', async () => {
  const { data, error } = await client
    .from<Profiles>('profiles')
    .select('*')
    .or(`username.eq.${subdomain.value}, subdomain.eq.${subdomain.value}`)
    .maybeSingle()

  set(profile, data)
  return data
})

definePageMeta({
  layout: 'user',
})
</script>

<template>
  <div>
    <NuxtPage v-if="profile" />
    <div v-else class="text-4xl my-20 font-bold text-center">
      Page not found hehe
    </div>
  </div>
</template>
