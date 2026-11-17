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
  theme: { toggle: 'Toggle colour mode' },
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
      'Portfolio of Wissem Badraoui, an engineering student at IMT Nord Europe interested in data and cybersecurity: experience, projects, resume and contact.',
    socialImageAlt: 'Wissem Badraoui, engineering student at IMT Nord Europe',
    personDescription:
      'Engineering student at IMT Nord Europe, interested in data analysis and information systems security.',
  },
  pages: {
    home: {
      eyebrow: 'Portfolio',
      heading: 'Portfolio',
      title: 'Wissem Badraoui, professional portfolio',
      description:
        'Portfolio of Wissem Badraoui, an engineering student at IMT Nord Europe looking for a data and cybersecurity internship from May 2027: experience, projects, resume and contact.',
    },
    projects: {
      eyebrow: 'Selected work',
      heading: 'Projects',
      title: 'Projects',
      description:
        'A selection of personal and technical projects developed alongside my studies, focused on useful tools, data and real-world contexts.',
    },
    contact: {
      eyebrow: 'Get in touch',
      heading: 'Contact',
      title: 'Contact',
      description:
        'Contact details, public profiles and the contact form for reaching Wissem Badraoui.',
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
    objective: 'Engineering student looking for a data and cybersecurity internship.',
    description:
      'Interested in data and cybersecurity. Two internships spent modernising internal tools, with high standards of reliability and confidentiality.',
    availability: 'Seeking an internship from May 2027',
    internship: {
      eyebrow: 'Internship sought',
      title: 'Data and cybersecurity internship',
      details: [
        { icon: 'i-ri-time-line', label: 'Duration', value: '12 to 16 weeks' },
        { icon: 'i-ri-calendar-line', label: 'Start', value: 'From May 2027' },
        { icon: 'i-ri-map-pin-line', label: 'Location', value: 'Lille · Paris area' },
      ],
    },
    focus: {
      eyebrow: 'Technical profile',
      title: 'Data and cybersecurity',
      details: [
        {
          icon: 'i-ri-graduation-cap-line',
          label: 'Education',
          value: 'IMT Nord Europe · Engineering cycle',
        },
        {
          icon: 'i-ri-shield-check-line',
          label: 'Approach',
          value: 'Analyse · Automate · Secure',
        },
        { icon: 'i-ri-map-pin-line', label: 'Location', value: 'Lille · Paris area' },
      ],
    },
    contactCta: 'Get in touch',
    aboutTitle: 'About',
    about: [
      'With an interest in data and cybersecurity, I spent two internships modernising internal tools used daily, with high standards of reliability and confidentiality.',
      'I want to deepen my skills in data analysis and information systems security, on concrete projects within an experienced team. Alongside my studies, I run the server that hosts my projects: continuous deployment, HTTPS, security headers and monitoring.',
    ],
    experienceTitle: 'Experience',
    experience: [
      {
        title: 'Intern · Software development and data',
        organization: 'DGFiP · Risk and Audit Unit',
        period: 'June – Aug. 2026',
        location: 'Paris',
        thumbnail: '/images/dgfip-emblem.png',
        bullets: [
          'Redesigned a Python/Tkinter application supporting payment audits (architecture, interface).',
          'Processed datasets of several million rows with DuckDB and SQLite, removing redundant computations.',
          'Built full-text and multi-criteria search, account review and a report-writing assistant.',
          'Iterative, batch-based delivery with the team and auditors, end-to-end testing and documentation.',
        ],
      },
      {
        title: 'Intern · Improvement of an internal test-tracking tool',
        organization: 'Nidec Leroy-Somer · Engineering Department',
        period: 'Jan. – Feb. 2025',
        location: 'Angoulême',
        thumbnail: '/images/leroy-somer-logo.png',
        bullets: [
          'Gathered requirements from technicians and engineers using an Excel/VBA test-tracking tool.',
          'Made data processing and calculation methods more reliable and redesigned the user interface.',
          'Developed new features in VBA and validated results against real data.',
        ],
      },
      {
        title: 'Volunteer technical team',
        organization: "Rubik's Network",
        period: 'Nov. 2022 – Present',
        location: 'Remote',
        thumbnail: '/images/rubiks.png',
        bullets: [
          'Wrote specifications and coordinated updates with developers and designers.',
          'Developed features, provided user support and prioritised reported issues.',
        ],
      },
    ],
    educationTitle: 'Education',
    education: [
      {
        institution: 'IMT Nord Europe · École Mines-Télécom',
        title: 'General engineering degree (Master’s level) · Year 3 of 5',
        period: '2024 – 2029',
        location: 'Lille',
        thumbnail: '/images/imt-logo.png',
        details: [
          'Courses: databases and SQL, networks, probability and statistics, algorithms.',
          '7-month team project for a start-up, as IT lead: a sensor demonstrator (October 2026 – April 2027, ongoing).',
          'Project management MOOC (October 2026): Scrum.',
          'Completed the integrated preparatory cycle in 2026.',
        ],
      },
      {
        institution: 'Lycée Saint-Paul',
        title: 'French Baccalauréat',
        period: '2021 – 2024',
        location: 'Angoulême',
        thumbnail: '/images/saintpaul-logo.png',
        details: ['Highest honours.', 'Mathematics and Physics-Chemistry.'],
      },
    ],
    involvementTitle: 'Involvement',
    involvement: [
      {
        title: 'Secretary',
        organization: 'IMT Nord Europe Student Union',
        period: 'Since 2026',
        location: 'Lille',
        bullets: ['Member of the board of the school’s student association.'],
      },
      {
        title: 'IT development team',
        organization: 'Cartel des Mines 2027',
        period: 'Since Oct. 2026',
        location: 'Douai',
        bullets: ['Building the website and the mobile app of the event.'],
      },
      {
        title: 'Orion Jeunesse hackathon · Participant',
        organization: 'French Ministry of Armed Forces',
        period: '27 – 28 March 2026',
        location: 'Lille',
        bullets: ['Theme: engaging young people in cyber defence.'],
      },
    ],
    skillsTitle: 'Skills',
    skills: [
      {
        title: 'Programming',
        description: 'Languages used for data analysis and development.',
        items: ['Python', 'SQL', 'C', 'TypeScript', 'JavaScript', 'VBA'],
      },
      {
        title: 'Data',
        description: 'Data storage, querying and analysis.',
        items: [
          'PostgreSQL',
          'MySQL',
          'SQLite',
          'DuckDB',
          'MongoDB',
          'Prisma',
          'pandas',
          'NumPy',
          'Jupyter',
          'Advanced Excel',
          'CaseWare IDEA',
        ],
      },
      {
        title: 'Web',
        description: 'Web applications and APIs.',
        items: ['Node.js', 'Express', 'Nuxt', 'Vue.js', 'REST APIs'],
      },
      {
        title: 'Systems and security',
        description: 'Running a server, deployment and monitoring.',
        items: ['Linux', 'Docker', 'CI/CD', 'HTTPS', 'Security headers', 'Grafana'],
      },
      {
        title: 'Tools',
        description: 'Tools used to build, test and collaborate.',
        items: ['Git', 'GitHub', 'JetBrains IDEs', 'AI agents', 'Postman', 'Jira'],
      },
      {
        title: 'Methods',
        description: 'How a project is run with a team.',
        items: [
          'Requirements analysis',
          'Agile project management',
          'Testing',
          'User documentation',
        ],
      },
    ],
    projectsTitle: 'Selected projects',
    projectsDescription:
      'A selection of personal and technical projects built alongside my studies.',
    allProjects: 'View all projects',
    languagesTitle: 'Languages',
    languages: [
      { name: 'French', level: 'Native · Certificat Voltaire 657', value: 100 },
      { name: 'English', level: 'B2 · TOEIC 925', value: 75 },
      { name: 'Spanish', level: 'A2', value: 35 },
    ],
    interestsTitle: 'Interests',
    interests: ['Tech news', 'Swimming', 'Cinema', 'Travel', 'Billiards', 'Video games'],
    contactTitle: 'Contact',
    contactDescription: 'For an internship, a technical discussion or any other enquiry.',
    locationLabel: 'Location',
    location: 'Lille · Paris area',
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
      title: 'Modernisation of an audit support tool (DGFiP)',
      description:
        'Internship in Paris: redesign of a Python application supporting payment audits, processing of datasets of several million rows with DuckDB and SQLite, full-text and multi-criteria search.',
    },
    omni: {
      title: 'Omni',
      description:
        'Windows app that converts, locally, the files of a game you own into Garry’s Mod content (props, player models, textures) and glTF models, with a viewer that checks each model. Rust core, Python orchestration, Nuxt interface.',
    },
    'ameli-extract': {
      title: 'AmeliExtract',
      description:
        'Python tool that converts Ameli payment statements (text PDFs) to JSON, locally, without the insured person’s identity: name, NIR and address are dropped, totals are checked and unknown layouts are rejected rather than guessed.',
    },
    infrastructure: {
      title: 'Self-hosted infrastructure',
      description:
        'Self-managed Linux server hosting every product: Docker services, continuous integration with Woodpecker and deployment on Dokploy, HTTPS, security headers and rate limiting, monitoring with Grafana.',
    },
    'wissem-ui': {
      title: 'Wissem UI and portfolio',
      description:
        'Personal website and shared design system built with Nuxt, Nuxt UI and Tailwind CSS, used across Wissem’s Industries applications.',
    },
    parcourtime: {
      title: 'ParcourTime',
      description:
        'A countdown web app for Parcoursup, showing the key dates in a simple and accessible interface based on the French State design system.',
    },
    zeldanes: {
      title: 'ZeldaNES',
      description:
        'Development in C with SDL2 of a game inspired by The Legend of Zelda as part of academic studies.',
    },
    'nidec-test-tool': {
      title: 'Internal test-tracking tool (Nidec Leroy-Somer)',
      description:
        'Improvement of an Excel/VBA tool used by the engineering department to track tests: more reliable data processing and calculations, a redesigned interface and new features.',
    },
    'internal-dashboard': {
      title: 'Internal admin dashboard',
      description:
        'An administration interface for internal platform operations, with authentication, roles, permissions and user management.',
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
    privacyNotice: 'The information provided is used only to process your request.',
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
    updated: '17 November 2026',
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
        title: 'Audience measurement',
        paragraphs: [
          'The website measures its traffic with Plausible Analytics, a cookieless tool installed on a server run by the publisher (analytics.wissem.pro).',
          'Data processed: the page viewed, the referring site, browser, operating system, device type and country, as well as clicks to external sites and contact form submissions. Resume downloads are counted by the website’s server (the “CV download” event, with the language and version of the resume), excluding bots and command-line clients.',
          'Events go through the website’s own address (the /_w path), which forwards them to Plausible with your IP address. Plausible does not store it: together with the browser, it is used to compute an identifier renewed every day, which cannot recognise you from one day to the next. Only aggregated statistics are kept.',
          'Purpose: knowing the website’s traffic and the interest in the resume. Legal basis: the publisher’s legitimate interest. These statistics are neither cross-referenced with other websites nor shared with third parties.',
        ],
      },
      {
        title: 'Cookies',
        paragraphs: [
          'The website sets two preference cookies, valid for 12 months: wsm_locale (language) and wsm_theme (light or dark theme). They are used for nothing else and do not require consent. Audience measurement sets no cookie.',
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
