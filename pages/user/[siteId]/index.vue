<script setup lang="ts">
import type { Posts } from '~/utils/types'

const client = useSupabaseClient()
const profile = useSubdomainProfile()

const { data, pending } = useAsyncData('posts', async () => {
  const { data, error } = await client
    .from<Posts>('posts')
    .select('*, profiles!inner (username)')
    .eq('active', true)
    // @ts-expect-error
    .eq('profiles.id', profile.value.id)
    .order('created_at', { ascending: false })

  return data
})
</script>

<template>
  <Head>
    <Title>
      {{ profile?.name }}'s blog
    </Title>
  </Head>
  <div class="my-20">
    <h1 class="text-4xl font-semibold">
      {{ profile?.name }}'s posts
    </h1>
    <div>
      <ul v-if="data">
        <li v-for="post in data" :key="post.id" class="my-4">
          <PostCard v-if="post.id" subdomain :post="post" />
        </li>
      </ul>
      <Loader v-if="pending" />
    </div>
    <!-- <aside></aside> -->
  </div>
</template>
