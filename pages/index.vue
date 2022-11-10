<script setup lang="ts">
import type { Posts } from '~/utils/types'

const client = useSupabaseClient()

const tabFocus = ref<string>('you')
const tabs = [
  {
    key: 'plus',
    name: '<svg width="19" height="19" class="kk ow ox"><path d="M9 9H3v1h6v6h1v-6h6V9h-6V3H9v6z" fill-rule="evenodd"></path></svg>',
    class: 'i-mdi-plus',
    iconOnly: true,
  },
  {
    key: 'you',
    name: 'For you',
    iconOnly: false,
  },
  {
    key: 'following',
    name: 'Following',
    iconOnly: false,
  },
]

const { data, pending } = useAsyncData(
  'posts',
  async () => {
    const { data } = await client
      .from<Posts>('posts')
      .select('*, profiles(avatar_url, name, username, domains (url, active) )')
      .eq('active', true)
      .order('created_at', { ascending: false })
    return data
  },
  { lazy: true, server: false },
)

const { Slash } = useMagicKeys()
watch(Slash, (n) => {
  if (n)
    useRouter().push('/write')
})

definePageMeta({
  middleware: ['user'],
})
</script>

<template>
  <Head>
    <Title>
      Experience keyboard-first blogging platform
    </Title>
  </Head>
  <div class="pt-6" />
  <div class="pb-20 md:w-[692px] m-auto">
    <div class="border-b-1 border-b-gray-200 sticky top-0 backdrop-blur">
      <div class="flex">
        <div v-for="tab in tabs" :key="tab.key" class="flex items-center justify-center h-12 mr-4 border-b-1 border-b-transparent" :class="{ '!border-b-dark-900': tabFocus === tab.key }">
          <div v-if="tab.iconOnly" v-html="tab.name" />
          <Anchor v-if="!tab.iconOnly" to="/" @click="tabFocus = tab.key">
            {{ tab.name }}
          </Anchor>
        </div>
      </div>
    </div>
    <Loader v-if="pending" />
    <ul v-else class="mt-6">
      <li v-for="post in data" :key="post.id">
        <PostCard :post="post" />
      </li>
    </ul>
  </div>
</template>
