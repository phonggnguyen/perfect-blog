export default defineEventHandler(({ req, res, context }) => {
  const hostname = req.headers.host || "meetoon.co"

  const mainDomain = ["localhost:3000", "meetoon.co"]

  if (!mainDomain.includes(hostname)) {
    const currentHost =
        process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
            ? hostname.replace(`.meetoon.co`, "")
            : hostname.replace(`.localhost:3000`, "")

    console.log({ currentHost })
    context.subdomain = currentHost
  }
})
