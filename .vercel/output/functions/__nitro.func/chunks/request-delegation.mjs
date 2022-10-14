import { defineEventHandler } from 'h3';

const requestDelegation = defineEventHandler((event) => {
  return "Hello add-domain";
});

export { requestDelegation as default };
//# sourceMappingURL=request-delegation.mjs.map
