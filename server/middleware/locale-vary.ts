// Only the root redirects according to the browser language; every other URL
// has a single language.
export default defineEventHandler((event) => {
  if (getRequestURL(event).pathname !== '/') return
  appendResponseHeader(event, 'vary', 'Accept-Language, Cookie')
})
