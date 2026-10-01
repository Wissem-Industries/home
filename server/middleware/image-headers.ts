const CONTENT_TYPES: Record<string, string> = {
  avif: 'image/avif',
  webp: 'image/webp',
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
}

// The IPX Node handler loses the headers it computes when it runs behind
// Nitro, so the content type and the cache policy are set here instead.
export default defineEventHandler((event) => {
  const { pathname } = getRequestURL(event)
  if (!pathname.startsWith('/_ipx/')) return

  const modifiers = pathname.split('/')[2] ?? ''
  const format = /(?:^|[&,])f_(\w+)/.exec(modifiers)?.[1]
  const contentType = format ? CONTENT_TYPES[format] : undefined
  if (contentType) setResponseHeader(event, 'content-type', contentType)
  setResponseHeader(event, 'cache-control', 'public, max-age=86400, stale-while-revalidate=604800')
  setResponseHeader(event, 'x-content-type-options', 'nosniff')
})
