<script setup lang="ts">
import { stripHtml } from 'string-strip-html'
import { format } from 'date-fns'
import type { PropType } from 'vue'
import type { Posts } from '~/utils/types'
import { constructUrl } from '~/utils/functions'

const props = defineProps({
  subdomain: Boolean,
  post: Object as PropType<Posts>,
})

const url = computed(() => constructUrl(props.post, props.subdomain))
</script>

<template>
  <NuxtLink class="group block hover:opacity-80 transition transition-opacity" :to="url">
    <div
      class="curosr-pointer py-6 flex flex-col-reverse md:flex-row transition-all cursor-pointer border-b-gray-200 border-b-1"
    >
      <div class="w-full flex flex-col justify-between h-auto">
        <div>
          <div v-if="!subdomain" class="flex items-center space-x-2">
            <NuxtImg v-if="post.profiles.avatar_url" class="w-5 h-5 rounded-full" :src="post.profiles?.avatar_url" />
            <h4 class="text-sm font-medium">
              {{ post.profiles.name }}
            </h4>
          </div>

          <h1 class="mt-2 font-bold text-2xl">
            {{ post.title }}
          </h1>
          <p class="mt-1 text-dark-300 text-sm">
            {{ stripHtml(post.body).result.slice(0, 260) }}...
          </p>
        </div>

        <div class="mt-4 text-sm text-gray-400 place-items-end">
          <span> {{ format(new Date(post.created_at), "MMM d") }}</span>
          <span v-if="post.tags.length > 0" class="ml-2 bg-light-300 px-2 py-1 rounded">{{ post.tags?.[0] }}</span>
        </div>
      </div>
      <NuxtImg
        v-if="post?.cover_img"
        class="w-full md:w-40 h-40 md:ml-12 mb-6 md:mb-0 flex-shrink-0 object-cover"
        :src="post.cover_img"
      />
    </div>
  </NuxtLink>
</template>
