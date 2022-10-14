export default defineEventHandler(({ req, res, context }) => {
  const hostname = req.headers.host || "perfect-blog.vercel.app"

  const mainDomain = ["localhost:3000", "perfect-blog.vercel.app"]

  if (!mainDomain.includes(hostname)) {
    const currentHost =
      process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
        ? hostname.replace(`.perfect-blog.vercel.app`, "")
        : hostname.replace(`.localhost:3000`, "")

    console.log("currentHost", currentHost)
    context.subdomain = currentHost
  }
})
