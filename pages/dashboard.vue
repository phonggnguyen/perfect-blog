<script setup lang="ts">
import { set } from '@vueuse/core'
import type { Profiles } from '~/utils/types'

const user = useSupabaseUser()
const client = useSupabaseClient()
const profile = useProfile()

const { pending } = useAsyncData(
  'profile',
  async () => {
    const { data } = await client
      .from<Profiles>('profiles')
      .select('*, domains(url, active), posts(id, title, created_at)')
      .order('created_at', { ascending: false, foreignTable: 'posts' })
      .eq('id', user.value?.id)
      .maybeSingle()

    set(profile, data)
    return data
  },
  { server: false },
)

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <Head>
    <Title>
      Dashboard
    </Title>
  </Head>
  <div class="my-12">
    <h2 class="text-3xl font-bold">
      Personal Account Settings
    </h2>

    <div class="flex">
      <aside class="flex-shrink-0 w-72 my-8">
        <ul>
          <li class="my-2">
            <Anchor to="/dashboard/posts">
              Posts
            </Anchor>
          </li>
          <li class="my-2">
            <Anchor to="/dashboard/profile">
              Profile
            </Anchor>
          </li>
          <li class="my-2">
            <Anchor to="/dashboard/domain">
              Domain
            </Anchor>
          </li>
        </ul>
      </aside>
      <Loader v-if="pending" />
      <NuxtPage v-else />
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  color: red
}
</style>
