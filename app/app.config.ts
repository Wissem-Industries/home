export default defineAppConfig({
  global: {
    picture: {
      dark: '/Logo_White.svg',
      light: '/Logo_Black.svg',
      alt: 'Photo de profil'
    },
    email: 'contact@wissem.pro',
    status: true
  },
  ui: {
    colors: {
      primary: 'violet',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `© ${new Date().getFullYear()} Wissem. • Tous droits réservés.`,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-maildotru',
      'to': `mailto:contact@wissem.pro`,
      'target': '_blank',
      'aria-label': 'Wissem on Mail'
    }, {
      'icon': 'i-simple-icons-linkedin',
      'to': 'https://www.linkedin.com/in/wissem-badraoui/',
      'target': '_blank',
      'aria-label': 'Wissem on LinkedIn'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/WissemBad',
      'target': '_blank',
      'aria-label': 'Wissem on GitHub'
    }, {
      'icon': 'i-simple-icons-discord',
      'to': 'https://discord.com/users/897468104643326014',
      'target': '_blank',
      'aria-label': 'Wissem on Discord'
    }]
  }
})
