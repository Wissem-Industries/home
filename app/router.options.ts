import type { RouterConfig } from '@nuxt/schema'
import { isUiHost, isUiPagePath, toUiHostPath } from '#shared/utils/site'

// The UI host serves the Wissem UI page alone, at its root; the main site does not serve it.
// server/middleware/hosts.ts redirects the other pages to their host before rendering.
export default {
  routes: (routes) => {
    if (!isUiHost(useRequestURL().hostname)) {
      return routes.filter((route) => !isUiPagePath(route.path))
    }
    return routes
      .filter((route) => isUiPagePath(route.path))
      .map((route) => ({ ...route, path: toUiHostPath(route.path) }))
  },
} satisfies RouterConfig
