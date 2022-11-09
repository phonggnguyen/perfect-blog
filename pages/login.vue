<script lang="ts" setup>
const client = useSupabaseClient()

const signIn = async () => {
  const { user } = await client.auth.signIn({ provider: "github" })

  console.log("user", user)
}

</script>

<template>
  <Head>
    <Title>
      Login
    </Title>
  </Head>
  <div class="flex flex-col mx-auto max-w-48 mt-20">
    <h1 class="text-4xl font-bold text-center">Login</h1>

    <button autofocus class="btn-primary mt-4" @click="signIn">Login with Github</button>
  </div>
</template>
