<script lang="ts" setup>
// micro compiler
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  to: {
    type: [String, Object],
    default: undefined,
  },
  href: {
    type: String,
    default: '',
  },
})
// state
const href = toRef(props, 'href')
const to = toRef(props, 'to')
</script>

<template>
  <NuxtLink
    v-if="to"
    tag="a"
    :to="to"
    class="text-sm text-dark-100 transition-colors duration-300 hover:opacity-80 transition transition-opacity"
  >
    <slot>{{ text }}</slot>
  </NuxtLink>
  <a
    v-else
    class="text-sm text-dark-100 transition-colors duration-300 hover:opacity-80 transition transition-opacity"
    :href="href"
  >
    <slot>{{ text }}</slot>
  </a>
</template>
