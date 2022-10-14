import { defineEventHandler, useBody, createError } from 'h3';

const deleteDomain_post = defineEventHandler(async (event) => {
  try {
    const { domain, user_id } = await useBody(event);
    if (Array.isArray(domain) || Array.isArray(user_id))
      createError({ statusCode: 400, statusMessage: "Bad request. Query parameters are not valid." });
    const data = await $fetch(
      `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${domain}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_BEARER_TOKEN}`
        }
      }
    );
    console.log({ domain, data });
    return data;
  } catch (err) {
    return createError({ statusCode: 500, statusMessage: err });
  }
});

export { deleteDomain_post as default };
//# sourceMappingURL=delete-domain.post.mjs.map
