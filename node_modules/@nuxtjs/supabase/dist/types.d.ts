
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['supabase']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['supabase']?: ModuleOptions }
}


export { default } from './module'
