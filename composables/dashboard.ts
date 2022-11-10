import type { Ref } from 'vue'
import type { Profiles } from '~/utils/types'
import { removeVietnameseTones } from '~/utils/functions'

export const useProfile = () => useState<Profiles>('profile', () => null)

export const useProfileSave = (payload: Ref<Partial<Profiles>>) => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()

  const isSaving = ref(false)

  const save = async () => {
    isSaving.value = true

    const isFacebook = user.value?.app_metadata.provider === 'facebook'
    if (isFacebook) {
      payload.value.avatar_url = user.value?.user_metadata.avatar_url
      payload.value.username = removeVietnameseTones(user.value?.user_metadata.name)
        .replaceAll(' ', '')
        .toLowerCase()
    }

    await client
      .from<Profiles>('profiles')
      .upsert({ ...payload.value, id: user.value?.id })
      .single()

    isSaving.value = false
  }

  useMagicKeys({
    passive: false,
    onEventFired(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 's' && e.type === 'keydown') {
        e.preventDefault()
        save()
      }
    },
  })

  return {
    save,
    isSaving,
  }
}
