export default defineEventHandler(({ req, res, context }) => {
  const hostname = req.headers.host || "meetoon.co"

  const mainDomain = ["localhost:3000", "meetoon.co"]

  console.log("hostname", hostname)
  if (!mainDomain.includes(hostname)) {
    const currentHost = hostname.replace(`.localhost:3000`, "")

    console.log("currentHost", currentHost)
    context.subdomain = currentHost
  }
})
