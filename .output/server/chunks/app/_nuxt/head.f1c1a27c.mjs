import { k as useHead } from '../server.mjs';

const useCustomHead = (title, description, image) => {
  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description != null ? description : "An open-source blogging platform + free custom domains. Powered by Nuxt 3, Supabase & Vercel"
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title != null ? title : "KBlog | Write your blog with keyboard only experience" },
      {
        name: "twitter:description",
        content: description != null ? description : "An open-source blogging platform + free custom domains. Powered by Nuxt 3, Supabase & Vercel"
      },
      { name: "twitter:image", content: image != null ? image : "https://meetoon.co/og.png" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title != null ? title : "KBlog | Write your blog with keyboard only experience" },
      { property: "og:url", content: "https://meetoon.co/" },
      { property: "og:image", content: image != null ? image : "https://meetoon.co/og.png" },
      { property: "og:image:secure_url", content: image != null ? image : "https://meetoon.co/og.png" },
      { property: "og:image:type", content: "image/png" },
      {
        property: "og:description",
        content: description != null ? description : "An open-source blogging platform + free custom domains. Powered by Nuxt 3, Supabase & Vercel"
      }
    ]
  });
};

export { useCustomHead as u };
//# sourceMappingURL=head.f1c1a27c.mjs.map
