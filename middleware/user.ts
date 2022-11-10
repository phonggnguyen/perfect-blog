import type { Profiles } from '~/utils/types'

export default defineNuxtRouteMiddleware(async () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  if (!user.value)
    return

  const { data: userInfo } = await client.from<Profiles>('profiles').select('id').eq('id', user.value.id).single()
  if (userInfo)
    return

  const { save } = useProfileSave(ref({
    name: user.value.user_metadata?.name,
  }))

  save()
})

