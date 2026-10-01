import type { PortfolioContent } from './types'

export const en = {
  locale: 'en',
  navigation: {
    label: 'Primary navigation',
    home: 'Home',
    projects: 'Projects',
    contact: 'Contact',
  },
  localeSwitchLabel: 'Switch to French',
  theme: { toggle: 'Toggle color mode' },
  footer: 'Wissem. • All rights reserved.',
  error: {
    title: 'Page not found',
    description: 'The requested page does not exist or is no longer available.',
    serverTitle: 'Something went wrong',
    serverDescription: 'The server ran into a problem. Please try again in a moment.',
    home: 'Back to home',
  },
  meta: {
    titleTemplate: '%s | Wissem',
    applicationName: 'Wissem Badraoui',
    defaultTitle: 'Wissem Badraoui | Portfolio',
    defaultDescription:
      'Professional portfolio of Wissem Badraoui, an engineering student at IMT Nord Europe, with projects, experience, resume, and contact information.',
    socialImageAlt: 'Wissem Badraoui, engineering student at IMT Nord Europe',
    personDescription:
      'Engineering student at IMT Nord Europe, interested in software development, data processing, systems security, and useful tools for technical teams.',
  },
  pages: {
    home: {
      eyebrow: 'Portfolio',
      heading: 'Portfolio',
      title: 'Wissem Badraoui, professional portfolio',
      description:
        'Professional portfolio of Wissem Badraoui, an engineering student at IMT Nord Europe, featuring technical projects, experience, resume, and contact details.',
    },
    projects: {
      eyebrow: 'Selected work',
      heading: 'Projects',
      title: 'Projects',
      description:
        'A selection of personal and technical projects developed alongside academic studies, focused on useful tools, web interfaces, and real-world contexts.',
    },
    contact: {
      eyebrow: 'Get in touch',
      heading: 'Contact',
      title: 'Contact',
      description:
        'Contact details, public profiles, and the contact form for reaching Wissem Badraoui.',
    },
  },
  profile: {
    name: 'Wissem.',
    avatarAlt: 'Monochrome logo of Wissem Badraoui.',
    status: 'Engineering student at IMT Nord Europe',
    objective: 'Engineering student open to technical discussions and collaborations.',
    description:
      'Strong interest in software development, data processing, systems security, and useful tools for technical teams.',
    availability: 'Open to conversations',
    internship: {
      eyebrow: 'Opportunity sought',
      title: 'Introductory technical internship in data engineering',
      details: [
        { icon: 'i-ri-time-line', label: 'Duration', value: '12 to 16 weeks' },
        { icon: 'i-ri-calendar-line', label: 'Start date', value: 'From June 2027' },
        {
          icon: 'i-ri-map-pin-line',
          label: 'Mobility',
          value: 'Ile-de-France · Lille metropolitan area',
        },
      ],
    },
    focus: {
      eyebrow: 'Technical profile',
      title: 'Software, data and security',
      details: [
        {
          icon: 'i-ri-graduation-cap-line',
          label: 'Education',
          value: 'IMT Nord Europe · Engineering cycle',
        },
        {
          icon: 'i-ri-code-s-slash-line',
          label: 'Approach',
          value: 'Build · Automate · Make reliable',
        },
        {
          icon: 'i-ri-map-pin-line',
          label: 'Mobility',
          value: 'Ile-de-France · Lille metropolitan area',
        },
      ],
    },
    contactCta: 'Get in touch',
    aboutTitle: 'About',
    about: [
      'Preference for practical projects grounded in real needs: improving an existing tool, making a workflow more reliable, or simplifying its use within a team.',
      'Particular interest in software development, data processing, and security, with consistent attention to reliability, clarity, and practical value.',
    ],
    experienceTitle: 'Experience',
    experience: [
      {
        title: 'Technical internship · Modernizing an internal audit support tool',
        organization: 'French Public Finances Directorate (DGFiP)',
        period: '2026 · 11 weeks',
        location: 'Paris',
        thumbnail: '/images/dgfip-logo.png',
        bullets: [
          'Modernization and restructuring of a Python/Tkinter business application supporting payment audits and anomaly analysis for authorized auditors.',
          'Optimization of high-volume data processing with SQLite and DuckDB, notably through the removal of expensive or repeated operations.',
          'Design of multi-criteria search, review, qualification, and result presentation workflows, with human judgment remaining central to the process.',
          'Strengthening of traceability and interrupted-session recovery while preserving existing business rules and data.',
          'Consolidation of the application and its user documentation through iterative feedback with supervisors and business users.',
        ],
      },
      {
        title: 'Technical internship · Company discovery',
        organization: 'Nidec Leroy-Somer',
        period: '2025 · 6 weeks',
        location: 'Angouleme',
        thumbnail: '/images/leroy-somer-logo.png',
        bullets: [
          'Analysis of requirements for an internal tool used by technicians and engineers.',
          'Improvement of data processing and calculation methods to strengthen the tool’s reliability.',
          'Redesign of the Excel interface for greater readability and simpler day-to-day use.',
          'Development of new VBA features and validation of results using real operational data.',
        ],
      },
      {
        title: 'Volunteer technical contribution',
        organization: "Rubik's Network",
        period: '2020 – Present',
        location: 'Remote',
        thumbnail: '/images/rubiks.png',
        bullets: [
          'Preparation of updates and coordination of platform-related work.',
          'Writing of specifications and collaboration with developers, designers, and contributors.',
          'Contribution to platform features and technical systems.',
          'User support, issue handling, and prioritization of reported problems.',
        ],
      },
    ],
    educationTitle: 'Education',
    education: [
      {
        institution: 'IMT Nord Europe',
        title: 'Engineering degree · Engineering cycle',
        period: '2024 – Present',
        location: 'Lille',
        thumbnail: '/images/imt-logo.png',
        details: [
          'First-year engineering-cycle student (undergraduate level +3).',
          'Completion of the integrated preparatory cycle in 2026.',
          'General academic background in mathematics, physics, and computer science.',
          'Collaborative group work and project-based learning.',
          'Foundations in project management.',
        ],
      },
      {
        institution: 'Saint-Paul High School',
        title: 'French general baccalaureate',
        period: '2021 – 2024',
        location: 'Angouleme',
        thumbnail: '/images/saintpaul-logo.png',
        details: [
          'Graduation with highest honors.',
          'Majors in mathematics and physics-chemistry.',
        ],
      },
    ],
    skillsTitle: 'Skills',
    skills: [
      {
        title: 'Languages',
        description: 'Programming languages used for application development.',
        items: ['C', 'Python', 'TypeScript', 'JavaScript', 'VBA', 'SQL'],
      },
      {
        title: 'Web',
        description: 'Web application development with the JavaScript ecosystem.',
        items: ['Nuxt', 'Vue.js', 'Node.js', 'Express'],
      },
      {
        title: 'Data',
        description: 'Application data storage, querying, and processing.',
        items: ['PostgreSQL', 'SQLite', 'DuckDB', 'Data processing'],
      },
      {
        title: 'Infrastructure',
        description: 'Servers, containerization, and application deployment.',
        items: ['Linux', 'Docker', 'VPS', 'Dokploy', 'CI/CD'],
      },
      {
        title: 'Automation',
        description: 'Scripts used to automate processing and technical tasks.',
        items: ['Python', 'Excel VBA', 'Parsing', 'CLI'],
      },
      {
        title: 'Tools',
        description: 'Tools used to build, test, and collaborate on projects.',
        items: ['Git', 'Postman', 'JetBrains', 'Jira'],
      },
    ],
    projectsTitle: 'Selected projects',
    projectsDescription:
      'A selection of personal and technical projects built alongside academic studies.',
    allProjects: 'View all projects',
    languagesTitle: 'Languages',
    languages: [
      { name: 'French', level: 'Native language', value: 100 },
      { name: 'English', level: 'B2', value: 70 },
      { name: 'Spanish', level: 'A2', value: 35 },
    ],
    interestsTitle: 'Interests',
    interests: ['Cinema', 'Video games', 'Swimming', 'Travel', 'Technology'],
    contactTitle: 'Contact',
    contactDescription: 'For technical discussions, collaborations, or any other enquiry.',
    locationLabel: 'Location',
    location: 'Ile-de-France · Lille metropolitan area',
  },
  resume: {
    label: 'Download resume',
    href: '/files/CV_Wissem_BADRAOUI_EN.pdf',
    filename: 'CV_Wissem_BADRAOUI_EN.pdf',
    started: 'The resume download has started.',
  },
  links: [
    {
      id: 'email',
      label: 'Email',
      value: 'contact@wissem.pro',
      to: 'mailto:contact@wissem.pro',
      icon: 'i-ri-mail-line',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: '@WissemBadraoui',
      to: 'https://linkedin.com/in/WissemBadraoui',
      icon: 'i-ri-linkedin-box-line',
    },
    {
      id: 'github',
      label: 'GitHub',
      value: '@WissemBad',
      to: 'https://github.com/WissemBad',
      icon: 'i-ri-github-line',
    },
    {
      id: 'website',
      label: 'Website',
      value: 'www.wissem.pro',
      to: 'https://www.wissem.pro',
      icon: 'i-ri-global-line',
    },
  ],
  projectActions: { view: 'View project', repo: 'View code', private: 'Private access' },
  projectCategories: {
    product: 'Product',
    internship: 'Internship',
    studies: 'Studies',
    personal: 'Personal',
  },
  projectStatuses: {
    live: 'Live',
    ongoing: 'Ongoing',
    finished: 'Completed',
    archived: 'Archived',
  },
  projectFilters: { label: 'Filter projects', all: 'All' },
  projectTexts: {
    'dgfip-audit-tool': {
      title: 'Modernization of an audit support tool (DGFiP)',
      description:
        'Internship in Paris: modernization and restructuring of a Python audit support application, optimization of high-volume data processing with SQLite and DuckDB, and stronger traceability.',
    },
    'wissem-sso': {
      title: 'Wissem SSO',
      description:
        'Identity provider for Wissem’s Industries applications, with passkey sign-in and OpenID Connect. Designed, deployed and maintained on self-hosted infrastructure.',
    },
    'wissem-move': {
      title: 'Wissem Move',
      description:
        'Web app that brings Évéole buses and TER Hauts-de-France journeys together, with favorites synced through Wissem SSO and widgets for iPhone and Mac.',
    },
    infrastructure: {
      title: 'Self-hosted infrastructure',
      description:
        'Woodpecker continuous integration, Docker images published to GHCR and automated deployment on Dokploy for all the products.',
    },
    'wissem-ui': {
      title: 'Wissem UI and portfolio',
      description:
        'Personal website and shared design system built with Nuxt, Nuxt UI and Tailwind CSS, used across Wissem’s Industries applications.',
    },
    parcourtime: {
      title: 'ParcourTime',
      description:
        'A countdown web app for Parcoursup, displaying key dates through a simple and accessible interface based on the French State design system.',
    },
    zeldanes: {
      title: 'ZeldaNES',
      description:
        'Development in C with SDL2 of a game inspired by The Legend of Zelda as part of academic studies.',
    },
    'satt-tool': {
      title: 'Internal data processing tool (SATT)',
      description:
        'Improvements made to an internal engineering office tool at Nidec Leroy-Somer, including data processing optimizations and new features to improve reliability and daily usability.',
    },
    'internal-dashboard': {
      title: 'Internal admin dashboard',
      description:
        'An administration interface for internal platform operations, with authentication, roles, permissions, and user management.',
    },
    'password-manager': {
      title: 'Password manager',
      description:
        'A command-line password manager built in Python, with encrypted storage and a CLI interface.',
    },
  },
  contact: {
    title: 'Contact',
    description: 'Contact for technical discussions, collaborations, or any other enquiry.',
    sidebarTitle: 'Details',
    sidebarDescription: 'Contact details and public profiles.',
    fields: {
      name: { label: 'Name', placeholder: 'Your name' },
      email: { label: 'Email', placeholder: 'you@example.com' },
      subject: { label: 'Subject', placeholder: 'Message subject' },
      message: { label: 'Message', placeholder: 'Your message' },
    },
    submit: 'Send message',
    responseHint: 'Reply as soon as possible.',
    privacyHint:
      'The information provided is used only to process your contact request. It is neither stored, published, nor shared with third parties.',
    privacyAriaLabel: 'Information about data processing',
    validation: {
      name: 'The name must be between 2 and 100 characters.',
      email: 'The email address is invalid.',
      subject: 'The subject must be between 3 and 150 characters.',
      message: 'The message must be between 10 and 3,000 characters.',
    },
    honeypotLabel: 'Leave this field empty',
    messages: {
      successTitle: 'Message sent',
      successDescription:
        'Thank you for your message. A reply will be provided as soon as possible.',
      errorTitle: 'Unable to send',
      errorDescription: 'An error occurred while sending the message. Please try again later.',
      rateLimited: 'Too many attempts. Please try again in a few minutes.',
      invalidPayload: 'The form data is invalid.',
      unavailable: 'The contact service is unavailable.',
    },
  },
} satisfies PortfolioContent
