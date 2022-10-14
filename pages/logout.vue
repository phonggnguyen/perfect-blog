<script lang="ts" setup>
const client = useSupabaseClient()
await client.auth.signOut()
</script>
