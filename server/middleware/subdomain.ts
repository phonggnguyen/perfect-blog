export default defineEventHandler(({ req, res, context }) => {
  const hostname = req.headers.host || "perfect-blog.vercel.app"

  const mainDomain = ["localhost:3000", "perfect-blog.vercel.app"]

  console.log("hostname", hostname)
  if (!mainDomain.includes(hostname)) {
    const currentHost = hostname.replace(`.localhost:3000`, "")

    console.log("currentHost", currentHost)
    context.subdomain = currentHost
  }
})
