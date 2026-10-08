import type { PortfolioContent } from './types'

export const fr = {
  locale: 'fr',
  navigation: {
    label: 'Navigation principale',
    home: 'Accueil',
    projects: 'Projets',
    contact: 'Contact',
    cv: 'CV',
  },
  localeSwitchLabel: 'Basculer en anglais',
  theme: { toggle: 'Changer de thème' },
  footer: 'Wissem. • Tous droits réservés.',
  footerLinks: { legal: 'Mentions légales', privacy: 'Confidentialité' },
  error: {
    title: 'Page introuvable',
    description: 'La page demandée n’existe pas ou n’est plus disponible.',
    serverTitle: 'Une erreur est survenue',
    serverDescription: 'Le serveur a rencontré un problème. Réessayez dans quelques instants.',
    home: 'Revenir à l’accueil',
  },
  meta: {
    titleTemplate: '%s | Wissem',
    applicationName: 'Wissem Badraoui',
    defaultTitle: 'Portfolio de Wissem Badraoui',
    defaultDescription:
      'Portfolio professionnel de Wissem Badraoui, élève ingénieur à IMT Nord Europe : projets, expériences, CV et contact.',
    socialImageAlt: 'Wissem Badraoui, élève ingénieur à IMT Nord Europe',
    personDescription:
      'Élève ingénieur à IMT Nord Europe, intéressé par le développement logiciel, le traitement de données, la sécurité des systèmes et les outils utiles aux équipes techniques.',
  },
  pages: {
    home: {
      eyebrow: 'Portfolio',
      heading: 'Portfolio',
      title: 'Wissem Badraoui, portfolio professionnel',
      description:
        'Portfolio professionnel de Wissem Badraoui, élève ingénieur à IMT Nord Europe, avec projets techniques, expériences, CV et contact.',
    },
    projects: {
      eyebrow: 'Projets sélectionnés',
      heading: 'Projets',
      title: 'Projets',
      description:
        'Sélection de projets personnels et techniques réalisés en parallèle du parcours académique, autour d’outils utiles, d’interfaces web et de contextes concrets.',
    },
    contact: {
      eyebrow: 'Prise de contact',
      heading: 'Contact',
      title: 'Contact',
      description:
        'Coordonnées, profils publics et formulaire de contact pour joindre Wissem Badraoui.',
    },
    cv: {
      eyebrow: 'Curriculum vitae',
      heading: 'CV',
      title: 'CV de Wissem Badraoui',
      description:
        'CV d’une page de Wissem Badraoui, élève ingénieur à IMT Nord Europe, en français et en anglais, à télécharger au format PDF.',
    },
    legal: {
      eyebrow: 'Informations légales',
      heading: 'Mentions légales',
      title: 'Mentions légales',
      description: 'Éditeur, hébergeur et propriété intellectuelle du site wissem.pro.',
    },
    privacy: {
      eyebrow: 'Données personnelles',
      heading: 'Confidentialité',
      title: 'Politique de confidentialité',
      description:
        'Données traitées par le site wissem.pro : finalités, destinataires, durées de conservation et droits.',
    },
  },
  profile: {
    name: 'Wissem.',
    avatarAlt: 'Logo monochrome de Wissem Badraoui.',
    status: 'Élève ingénieur à IMT Nord Europe',
    objective: 'Élève ingénieur, ouvert aux échanges techniques et aux collaborations.',
    description:
      'Intérêt marqué pour le développement logiciel, le traitement de données, la sécurité des systèmes et les outils utiles aux équipes techniques.',
    availability: 'Ouvert aux échanges',
    internship: {
      eyebrow: 'Opportunité recherchée',
      title: 'Stage d’initiation technique en ingénierie des données',
      details: [
        { icon: 'i-ri-time-line', label: 'Durée', value: '12 à 16 semaines' },
        { icon: 'i-ri-calendar-line', label: 'Début', value: 'À partir de juin 2027' },
        {
          icon: 'i-ri-map-pin-line',
          label: 'Mobilité',
          value: 'Île-de-France · Métropole lilloise',
        },
      ],
    },
    focus: {
      eyebrow: 'Profil technique',
      title: 'Logiciel, données et sécurité',
      details: [
        {
          icon: 'i-ri-graduation-cap-line',
          label: 'Formation',
          value: 'IMT Nord Europe · Cycle ingénieur',
        },
        {
          icon: 'i-ri-code-s-slash-line',
          label: 'Approche',
          value: 'Concevoir · Automatiser · Fiabiliser',
        },
        {
          icon: 'i-ri-map-pin-line',
          label: 'Mobilité',
          value: 'Île-de-France · Métropole lilloise',
        },
      ],
    },
    contactCta: 'Prendre contact',
    aboutTitle: 'À propos',
    about: [
      'Goût pour les projets concrets fondés sur un besoin réel : amélioration d’un outil existant, fiabilisation d’un traitement ou simplification de son usage par une équipe.',
      'Intérêt particulier pour le développement logiciel, le traitement de données et les enjeux de sécurité, avec une attention constante portée à la fiabilité, à la clarté et à l’utilité des solutions.',
    ],
    experienceTitle: 'Expériences',
    experience: [
      {
        title: 'Stage technique · Modernisation d’un outil d’assistance à l’audit',
        organization: 'Direction générale des Finances publiques (DGFiP)',
        period: '2026',
        location: 'Paris',
        thumbnail: '/images/dgfip-logo.png',
        bullets: [
          'Modernisation et restructuration d’une application métier Python/Tkinter d’assistance à l’audit de paiements et à l’analyse d’anomalies, utilisée par des auditeurs habilités.',
          'Optimisation du traitement de volumes de données importants avec SQLite et DuckDB, notamment par la suppression d’opérations coûteuses ou répétées.',
          'Conception de parcours de recherche multicritère, de contrôle, de qualification et de restitution, avec maintien du jugement humain au centre du processus.',
          'Renforcement de la traçabilité et de la reprise d’un travail interrompu, dans le respect des règles métier et des données existantes.',
          'Consolidation de l’application et de sa documentation au fil d’itérations avec les encadrants et les utilisateurs métier.',
        ],
      },
      {
        title: 'Stage technique · Découverte de l’entreprise',
        organization: 'Nidec Leroy-Somer',
        period: '2025',
        location: 'Angoulême',
        thumbnail: '/images/leroy-somer-logo.png',
        bullets: [
          'Analyse des besoins autour d’un outil interne utilisé par des techniciens et des ingénieurs.',
          'Amélioration des traitements de données et des méthodes de calcul afin de renforcer la fiabilité de l’outil.',
          'Refonte de l’interface Excel pour une meilleure lisibilité et un usage quotidien simplifié.',
          'Développement de nouvelles fonctionnalités en VBA et validation des résultats à partir de données réelles.',
        ],
      },
      {
        title: 'Contribution technique bénévole',
        organization: 'Rubik’s Network',
        period: '2020 – Présent',
        location: 'À distance',
        thumbnail: '/images/rubiks.png',
        bullets: [
          'Préparation de mises à jour et coordination de sujets liés à la plateforme.',
          'Rédaction de spécifications et collaboration avec développeurs, designers et contributeurs.',
          'Contribution au développement de fonctionnalités et de systèmes liés à la plateforme.',
          'Support utilisateur, traitement et priorisation des problèmes signalés.',
        ],
      },
    ],
    educationTitle: 'Formation',
    education: [
      {
        institution: 'IMT Nord Europe',
        title: 'Diplôme d’ingénieur · Cycle ingénieur',
        period: '2024 – Présent',
        location: 'Lille',
        thumbnail: '/images/imt-logo.png',
        details: [
          'Élève ingénieur en première année du cycle ingénieur (BAC+3).',
          'Cycle préparatoire intégré validé en 2026.',
          'Formation générale en mathématiques, physique et informatique.',
          'Travaux de groupe et projets collaboratifs.',
          'Premières bases en gestion de projet.',
        ],
      },
      {
        institution: 'Lycée Saint-Paul',
        title: 'Baccalauréat général',
        period: '2021 – 2024',
        location: 'Angoulême',
        thumbnail: '/images/saintpaul-logo.png',
        details: ['Mention Très Bien.', 'Spécialités Mathématiques et Physique-Chimie.'],
      },
    ],
    skillsTitle: 'Compétences',
    skills: [
      {
        title: 'Langages',
        description: 'Langages utilisés pour le développement applicatif.',
        items: ['C', 'Python', 'TypeScript', 'JavaScript', 'VBA', 'SQL'],
      },
      {
        title: 'Web',
        description: 'Développement d’applications web avec l’écosystème JavaScript.',
        items: ['Nuxt', 'Vue.js', 'Node.js', 'Express'],
      },
      {
        title: 'Données',
        description: 'Stockage, requêtes et traitement de données applicatives.',
        items: ['PostgreSQL', 'SQLite', 'DuckDB', 'Traitement de données'],
      },
      {
        title: 'Infrastructure',
        description: 'Serveurs, conteneurisation et déploiement d’applications.',
        items: ['Linux', 'Docker', 'VPS', 'Dokploy', 'CI/CD'],
      },
      {
        title: 'Automatisation',
        description: 'Scripts pour automatiser des traitements et des tâches techniques.',
        items: ['Python', 'Excel VBA', 'Parsing', 'CLI'],
      },
      {
        title: 'Outils',
        description: 'Outils utilisés pour développer, tester et collaborer sur les projets.',
        items: ['Git', 'Postman', 'JetBrains', 'Jira'],
      },
    ],
    projectsTitle: 'Quelques projets',
    projectsDescription:
      'Sélection de projets personnels et techniques réalisés en parallèle du parcours académique.',
    allProjects: 'Voir tous les projets',
    languagesTitle: 'Langues',
    languages: [
      { name: 'Français', level: 'Langue maternelle', value: 100 },
      { name: 'Anglais', level: 'B2', value: 70 },
      { name: 'Espagnol', level: 'A2', value: 35 },
    ],
    interestsTitle: 'Centres d’intérêt',
    interests: ['Cinéma', 'Jeux vidéo', 'Natation', 'Voyages', 'Technologie'],
    contactTitle: 'Contact',
    contactDescription: 'Pour un échange technique, une collaboration ou toute autre demande.',
    locationLabel: 'Localisation',
    location: 'Île-de-France · Métropole lilloise',
  },
  resume: {
    label: 'Télécharger le CV',
    href: '/cv.pdf',
    filename: 'CV_Wissem_Badraoui_FR.pdf',
    started: 'Le téléchargement du CV a démarré.',
  },
  resumePage: {
    intro: 'CV d’une page, en français et en anglais.',
    previewAlt: 'Aperçu de la première page du CV de Wissem Badraoui',
    downloadFr: 'Télécharger en français',
    downloadEn: 'Télécharger en anglais',
    versionLabel: 'Version',
    updatedLabel: 'Mis à jour le',
    contents: ['Formation', 'Expériences', 'Projets', 'Compétences'],
    note: 'Version publique, sans téléphone ni coordonnées personnelles. Je transmets la version complète sur demande.',
    contactCta: 'Me contacter',
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
      label: 'Site web',
      value: 'www.wissem.pro',
      to: 'https://www.wissem.pro',
      icon: 'i-ri-global-line',
    },
  ],
  projectActions: { view: 'Voir le projet', repo: 'Accéder au code', private: 'Accès privé' },
  projectCategories: {
    product: 'Produit',
    internship: 'Stage',
    studies: 'Études',
    personal: 'Personnel',
  },
  projectStatuses: {
    live: 'En ligne',
    ongoing: 'En cours',
    finished: 'Terminé',
    archived: 'Archivé',
  },
  projectFilters: { label: 'Filtrer les projets', all: 'Tous' },
  projectTexts: {
    'dgfip-audit-tool': {
      title: 'Modernisation d’un outil d’aide à l’audit (DGFiP)',
      description:
        'Stage à Paris : modernisation et restructuration d’une application Python d’assistance à l’audit, optimisation du traitement de gros volumes de données avec SQLite et DuckDB, et renforcement de la traçabilité.',
    },
    move: {
      title: 'Move',
      description:
        'Application web qui réunit les bus Évéole et les TER Hauts-de-France, avec favoris synchronisés grâce à Wissem SSO et widgets pour iPhone et Mac.',
    },
    infrastructure: {
      title: 'Infrastructure auto-hébergée',
      description:
        'Intégration continue Woodpecker, images Docker publiées sur GHCR et déploiement automatisé sur Dokploy pour l’ensemble des produits.',
    },
    'wissem-ui': {
      title: 'Wissem UI et portfolio',
      description:
        'Site personnel et système de design partagé, construits avec Nuxt, Nuxt UI et Tailwind CSS, utilisés par les applications de Wissem’s Industries.',
    },
    parcourtime: {
      title: 'ParcourTime',
      description:
        'Application web de compte à rebours pour Parcoursup, avec affichage des dates clés dans une interface simple et accessible, fondée sur le Système de design de l’État.',
    },
    zeldanes: {
      title: 'ZeldaNES',
      description:
        'Développement en C avec la bibliothèque SDL2 d’un jeu inspiré de The Legend of Zelda dans le cadre des études.',
    },
    'satt-tool': {
      title: 'Outil interne de traitement de données (SATT)',
      description:
        'Amélioration d’un outil interne du bureau d’études chez Nidec Leroy-Somer : optimisation du traitement de données et ajout de fonctionnalités pour améliorer la fiabilité et l’usage de l’outil.',
    },
    'internal-dashboard': {
      title: 'Panel d’administration interne',
      description:
        'Interface d’administration pour la gestion interne d’une plateforme, avec authentification, rôles, permissions et gestion des utilisateurs.',
    },
    'password-manager': {
      title: 'Gestionnaire de mots de passe',
      description:
        'Gestionnaire de mots de passe en ligne de commande développé en Python, avec stockage chiffré et interface CLI.',
    },
  },
  contact: {
    title: 'Contact',
    description:
      'Prise de contact pour un échange technique, une collaboration ou toute autre demande.',
    sidebarTitle: 'Coordonnées',
    sidebarDescription: 'Coordonnées et profils publics.',
    fields: {
      name: { label: 'Nom', placeholder: 'Votre nom' },
      email: { label: 'Email', placeholder: 'vous@example.com' },
      subject: { label: 'Sujet', placeholder: 'Sujet du message' },
      message: { label: 'Message', placeholder: 'Votre message' },
    },
    submit: 'Envoyer le message',
    responseHint: 'Réponse dans les plus brefs délais.',
    privacyNotice:
      'Les informations saisies servent uniquement au traitement de votre demande.',
    privacyLink: 'Politique de confidentialité',
    validation: {
      name: 'Le nom doit comporter entre 2 et 100 caractères.',
      email: 'L’adresse email n’est pas valide.',
      subject: 'Le sujet doit comporter entre 3 et 150 caractères.',
      message: 'Le message doit comporter entre 10 et 3 000 caractères.',
    },
    honeypotLabel: 'Laisser ce champ vide',
    messages: {
      successTitle: 'Message envoyé',
      successDescription: 'Merci pour votre message. Une réponse sera apportée dès que possible.',
      errorTitle: 'Envoi impossible',
      errorDescription:
        'Une erreur est survenue lors de l’envoi du message. Merci de réessayer plus tard.',
      rateLimited: 'Trop de tentatives, réessaie dans quelques minutes.',
      invalidPayload: 'Les données du formulaire sont invalides.',
      unavailable: 'Le service de contact est indisponible.',
    },
  },
  legal: {
    intro:
      'Informations prévues par l’article 6 de la loi du 21 juin 2004 pour la confiance dans l’économie numérique.',
    updatedLabel: 'Dernière mise à jour',
    updated: '8 octobre 2026',
    sections: [
      {
        title: 'Éditeur du site',
        paragraphs: [
          'Le site www.wissem.pro est édité à titre non professionnel par Wissem Badraoui, personne physique, qui en est aussi le directeur de la publication.',
          'Contact : contact@wissem.pro.',
        ],
      },
      {
        title: 'Hébergement',
        paragraphs: [
          'Le site est hébergé par OVH SAS, 2 rue Kellermann, 59100 Roubaix, France (RCS Lille Métropole 424 761 419 00045), téléphone : +33 9 72 10 10 07.',
          'Le trafic transite par Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis, qui assure le cache et la protection du site.',
        ],
      },
      {
        title: 'Propriété intellectuelle',
        paragraphs: [
          'Les textes et images du site sont la propriété de Wissem Badraoui. Toute reproduction sans autorisation est interdite.',
          'Le code source du site est publié sous licence MIT sur GitHub (Wissem-Industries/home) ; cette licence ne couvre pas les textes, images et logos du site. Les noms et logos d’organisations cités appartiennent à leurs titulaires.',
        ],
      },
      {
        title: 'Liens externes',
        paragraphs: [
          'Le site renvoie vers des services tiers (GitHub, LinkedIn, projets hébergés ailleurs). Leur contenu et leurs pratiques ne relèvent pas de l’éditeur.',
        ],
      },
      {
        title: 'Données personnelles',
        paragraphs: [
          'Le traitement des données personnelles est décrit dans la politique de confidentialité du site.',
        ],
      },
    ],
  },
  privacy: {
    intro:
      'Ce site collecte le moins de données possible. Cette page indique lesquelles, pourquoi, qui les reçoit et combien de temps elles sont conservées.',
    updatedLabel: 'Dernière mise à jour',
    updated: '8 octobre 2026',
    sections: [
      {
        title: 'Responsable du traitement',
        paragraphs: ['Wissem Badraoui, joignable à contact@wissem.pro.'],
      },
      {
        title: 'Formulaire de contact',
        paragraphs: [
          'Données traitées : nom, adresse e-mail, sujet et message saisis dans le formulaire.',
          'Finalité : répondre à votre demande. Base légale : l’intérêt légitime de l’éditeur à répondre aux messages reçus, ou des mesures précontractuelles lorsque vous les demandez.',
          'Le site ne conserve pas votre message. Il est transmis à l’éditeur par la messagerie Telegram, dont les serveurs peuvent se trouver hors de l’Union européenne ; Telegram intervient comme prestataire de messagerie.',
          'Durée : le message est supprimé au plus tard 12 mois après le dernier échange.',
        ],
      },
      {
        title: 'Adresse IP et sécurité',
        paragraphs: [
          'Pour limiter les envois abusifs, votre adresse IP est comptée en mémoire pendant 5 minutes lors d’un envoi du formulaire, puis oubliée. Le serveur et Cloudflare peuvent aussi consigner les adresses IP dans leurs journaux techniques, à des fins de sécurité.',
        ],
      },
      {
        title: 'Cookies',
        paragraphs: [
          'Le site dépose deux cookies de préférence, valables 12 mois : wsm_locale (langue) et wsm_theme (thème clair ou sombre). Ils ne servent à rien d’autre et ne demandent pas de consentement.',
        ],
      },
      {
        title: 'Vos droits',
        paragraphs: [
          'Vous pouvez demander l’accès à vos données, leur rectification ou leur effacement, ou vous opposer à leur traitement, en écrivant à contact@wissem.pro. Une réponse est apportée dans un délai d’un mois.',
          'En cas de désaccord, vous pouvez saisir la CNIL (www.cnil.fr).',
        ],
      },
    ],
  },
} satisfies PortfolioContent
