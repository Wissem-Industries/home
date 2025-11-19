import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [{
  label: 'Home',
  icon: 'i-lucide-home',
  to: '/'
}, {
  label: 'Projets',
  icon: 'i-lucide-folder',
  to: '/projects'
}, {
  label: 'Contact',
  icon: 'i-lucide-message-square',
  to: '/contact'
}]
