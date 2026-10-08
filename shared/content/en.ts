import type { PortfolioContent } from './types'

export const en = {
  locale: 'en',
  navigation: {
    label: 'Primary navigation',
    home: 'Home',
    projects: 'Projects',
    contact: 'Contact',
    cv: 'Resume',
  },
  localeSwitchLabel: 'Switch to French',
  theme: { toggle: 'Toggle color mode' },
  footer: 'Wissem. • All rights reserved.',
  footerLinks: { legal: 'Legal notice', privacy: 'Privacy' },
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
    cv: {
      eyebrow: 'Curriculum vitae',
      heading: 'Resume',
      title: 'Resume of Wissem Badraoui',
      description:
        'One-page resume of Wissem Badraoui, an engineering student at IMT Nord Europe, in French and English, available as a PDF download.',
    },
    legal: {
      eyebrow: 'Legal information',
      heading: 'Legal notice',
      title: 'Legal notice',
      description: 'Publisher, host and intellectual property of the wissem.pro website.',
    },
    privacy: {
      eyebrow: 'Personal data',
      heading: 'Privacy',
      title: 'Privacy policy',
      description:
        'Data processed by the wissem.pro website: purposes, recipients, retention periods and rights.',
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
        period: '2026',
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
        period: '2025',
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
    href: '/en/cv.pdf',
    filename: 'CV_Wissem_Badraoui_EN.pdf',
    started: 'The resume download has started.',
  },
  resumePage: {
    intro: 'One-page resume, in French and English.',
    previewAlt: 'Preview of the first page of the resume of Wissem Badraoui',
    downloadFr: 'Télécharger en français',
    downloadEn: 'Download in English',
    versionLabel: 'Version',
    updatedLabel: 'Updated on',
    contents: ['Education', 'Experience', 'Projects', 'Skills'],
    note: 'Public version, without phone number or personal details. I can send the full version on request.',
    contactCta: 'Get in touch',
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
    move: {
      title: 'Move',
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
    privacyNotice:
      'The information provided is used only to process your request.',
    privacyLink: 'Privacy policy',
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
  legal: {
    intro:
      'Information required by article 6 of the French law of 21 June 2004 on trust in the digital economy.',
    updatedLabel: 'Last updated',
    updated: '8 October 2026',
    sections: [
      {
        title: 'Publisher',
        paragraphs: [
          'The website www.wissem.pro is published on a non-professional basis by Wissem Badraoui, a private individual, who is also the publication director.',
          'Contact: contact@wissem.pro.',
        ],
      },
      {
        title: 'Hosting',
        paragraphs: [
          'The website is hosted by OVH SAS, 2 rue Kellermann, 59100 Roubaix, France (RCS Lille Métropole 424 761 419 00045), phone: +33 9 72 10 10 07.',
          'Traffic goes through Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, United States, which provides caching and protection for the site.',
        ],
      },
      {
        title: 'Intellectual property',
        paragraphs: [
          'The texts and images on this website belong to Wissem Badraoui. Reproduction without permission is prohibited.',
          'The source code of the website is published under the MIT licence on GitHub (Wissem-Industries/home); this licence does not cover the texts, images and logos of the website. Names and logos of the organisations mentioned belong to their owners.',
        ],
      },
      {
        title: 'External links',
        paragraphs: [
          'The website links to third-party services (GitHub, LinkedIn, projects hosted elsewhere). Their content and practices are not under the publisher’s control.',
        ],
      },
      {
        title: 'Personal data',
        paragraphs: [
          'The processing of personal data is described in the privacy policy of the website.',
        ],
      },
    ],
  },
  privacy: {
    intro:
      'This website collects as little data as possible. This page states which data, why, who receives it and how long it is kept.',
    updatedLabel: 'Last updated',
    updated: '8 October 2026',
    sections: [
      {
        title: 'Data controller',
        paragraphs: ['Wissem Badraoui, reachable at contact@wissem.pro.'],
      },
      {
        title: 'Contact form',
        paragraphs: [
          'Data processed: the name, email address, subject and message entered in the form.',
          'Purpose: answering your request. Legal basis: the publisher’s legitimate interest in answering the messages received, or pre-contractual measures when you ask for them.',
          'The website does not keep your message. It is sent to the publisher through Telegram, whose servers may be outside the European Union; Telegram acts as a messaging provider.',
          'Retention: the message is deleted at most 12 months after the last exchange.',
        ],
      },
      {
        title: 'IP address and security',
        paragraphs: [
          'To limit abuse, your IP address is counted in memory for 5 minutes when the form is submitted, then forgotten. The server and Cloudflare may also record IP addresses in their technical logs for security purposes.',
        ],
      },
      {
        title: 'Cookies',
        paragraphs: [
          'The website sets two preference cookies, valid for 12 months: wsm_locale (language) and wsm_theme (light or dark theme). They are used for nothing else and do not require consent.',
        ],
      },
      {
        title: 'Your rights',
        paragraphs: [
          'You can ask for access to your data, its correction or erasure, or object to its processing, by writing to contact@wissem.pro. You get an answer within one month.',
          'If you disagree with the answer, you can lodge a complaint with the CNIL (www.cnil.fr).',
        ],
      },
    ],
  },
} satisfies PortfolioContent
