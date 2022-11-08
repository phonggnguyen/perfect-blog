export default defineEventHandler(({ req, res, context }) => {
  const hostname = req.headers.host || "meetruyen.com"

  const mainDomain = ["localhost:3000", "meetruyen.com"]

  if (!mainDomain.includes(hostname)) {
    const currentHost =
      process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
        ? hostname.replace(`.meetruyen.com`, "")
        : hostname.replace(`.localhost:3000`, "")

    console.log("currentHost", currentHost)
    context.subdomain = currentHost
  }
})
