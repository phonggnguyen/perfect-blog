<script lang="ts" setup>
</script>

<template>
  <div class="bg-light-200">
    <div class="max-w-[1504px] m-auto">
      <div class="flex flex-row justify-between">
        <Nav />
        <main class="">
          <slot />
        </main>
        <div class="w-100 border-l-1 border-l-gray-200" />
      </div>
    </div>
  </div>
</template>
