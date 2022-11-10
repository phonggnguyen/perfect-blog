<script setup lang="ts">
const profile = useProfile()

const payload = ref({ name: profile.value.name })
const { save, isSaving } = useProfileSave(payload)

const saveProfile = async () => {
  save()
}
</script>

<template>
  <div class="w-full">
    <div class="flex w-full justify-end">
      <Button :loading="isSaving" class="mb-8 btn-primary" @click="saveProfile">
        Save <span class="ml-2">⌘S</span>
      </Button>
    </div>

    <div class="flex items-center">
      <label for="name" class="flex-shrink-0 mr-2">Name :</label>
      <input id="name" v-model="payload.name" type="text" name="name" class="bg-white">
    </div>
  </div>
</template>
