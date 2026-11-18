import { canonicalPagePath } from '#shared/utils/site'

// One address per page, so search engines do not index `/projects/` or `/Projects` beside
// `/projects`. Runs before hosts.ts, which then moves the page to its host if needed.
export default defineEventHandler((event) => {
  if (event.method !== 'GET' && event.method !== 'HEAD') return
  const url = getRequestURL(event)
  const path = canonicalPagePath(url.pathname)
  if (path) return sendRedirect(event, path + url.search, 301)
})
