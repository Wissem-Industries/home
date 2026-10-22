import '@nuxt/image'

declare module '@nuxt/image' {
  interface ImageModifiers {
    /** Application release key used to invalidate cached IPX cover URLs. */
    v?: string
  }
}
