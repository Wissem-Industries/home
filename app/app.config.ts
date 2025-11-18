export default defineAppConfig({
  global: {
    picture: {
      dark: '/Logo_White.svg',
      light: '/Logo_Dark.svg',
      alt: 'Logo'
    },
    meetingLink: 'https://cal.com/',
    email: 'contact@wissem.pro',
    available: true
  },
  ui: {
    colors: {
      primary: 'white',
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
    credits: `© ${new Date().getFullYear()} Wissem. ・ All rights reserved.`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-maildotru',
      'to': 'mailto:contact@wissem.pro',
      'target': '_blank',
      'aria-label': 'Mail'

    }, {
      'icon': 'i-simple-icons-discord',
      'to': 'https://discord.com/users/897468104643326014',
      'target': '_blank',
      'aria-label': 'Discord'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/WissemBad',
      'target': '_blank',
      'aria-label': 'GitHub'
    }, {
      'icon': 'i-simple-icons-linkedin',
      'to': 'https://www.linkedin.com/in/WissemBadraoui/',
      'target': '_blank',
      'aria-label': 'LinkedIn'
    }]
  }
})
