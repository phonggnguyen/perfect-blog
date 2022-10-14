import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "user"
declare module "/Users/bon/Documents/my-workspace/perfect-blog/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}