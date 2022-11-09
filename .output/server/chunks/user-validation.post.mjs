import { defineEventHandler, useBody } from 'h3';

const userValidation_post = defineEventHandler(async (event) => {
  await useBody(event);
  event.req.headers.host;
  return "auth cookie set";
});

export { userValidation_post as default };
//# sourceMappingURL=user-validation.post.mjs.map
