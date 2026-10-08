// Security headers for every response, and a Content Security Policy for the HTML pages.
//
// Scripts and styles stay on this origin. Inline scripts are still allowed: Nuxt writes its
// payload and the color-mode script inline, and the site renders no user content.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ')

const HEADERS: Record<string, string> = {
  'strict-transport-security': 'max-age=31536000',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy':
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
  'cross-origin-opener-policy': 'same-origin',
}

export default defineNitroPlugin((nitroApp) => {
  // The dev server needs inline evaluation and websockets for hot reload.
  if (import.meta.dev) return

  nitroApp.hooks.hook('beforeResponse', (event) => {
    setResponseHeaders(event, HEADERS)
    removeResponseHeader(event, 'x-powered-by')
    const contentType = String(getResponseHeader(event, 'content-type') ?? '')
    if (contentType.startsWith('text/html')) {
      setResponseHeader(event, 'content-security-policy', CONTENT_SECURITY_POLICY)
    }
  })
})
