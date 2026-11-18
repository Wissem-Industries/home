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
      'Portfolio de Wissem Badraoui, élève-ingénieur à IMT Nord Europe intéressé par les données et la cybersécurité : expériences, projets, CV et contact.',
    socialImageAlt: 'Wissem Badraoui, élève-ingénieur à IMT Nord Europe',
    personDescription:
      'Élève-ingénieur à IMT Nord Europe, intéressé par l’analyse de données et la sécurité des systèmes d’information.',
  },
  pages: {
    home: {
      eyebrow: 'Portfolio',
      heading: 'Portfolio',
      title: 'Wissem Badraoui, portfolio professionnel',
      description:
        'Portfolio de Wissem Badraoui, élève-ingénieur à IMT Nord Europe, à la recherche d’un stage en données et cybersécurité dès mai 2027 : expériences, projets, CV et contact.',
    },
    projects: {
      eyebrow: 'Projets sélectionnés',
      heading: 'Projets',
      title: 'Projets de Wissem Badraoui',
      description:
        'Sélection de projets personnels et techniques réalisés en parallèle du parcours académique, autour d’outils utiles, d’interfaces web et de contextes concrets.',
    },
    contact: {
      eyebrow: 'Prise de contact',
      heading: 'Contact',
      title: 'Contacter Wissem Badraoui',
      description:
        'Coordonnées, profils publics et formulaire de contact pour joindre Wissem Badraoui.',
    },
    cv: {
      eyebrow: 'Curriculum vitae',
      heading: 'CV',
      title: 'CV de Wissem Badraoui',
      description:
        'CV d’une page de Wissem Badraoui, élève-ingénieur à IMT Nord Europe, en français et en anglais, à télécharger au format PDF.',
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
    ui: {
      eyebrow: 'Système de design',
      heading: 'Wissem UI',
      title: 'Wissem UI, système de design',
      description:
        'Le système de design partagé des applications de Wissem’s Industries : thème, verre, composants et animations, publié en Nuxt Layer. Tout ce qui suit est rendu par le paquet lui-même.',
    },
  },
  profile: {
    name: 'Wissem.',
    avatarAlt: 'Logo monochrome de Wissem Badraoui.',
    status: 'Élève-ingénieur à IMT Nord Europe',
    objective: 'Élève-ingénieur à la recherche d’un stage en données et cybersécurité.',
    description:
      'Intéressé par les données et la cybersécurité. Deux stages consacrés à la modernisation d’outils internes, avec une exigence de fiabilité et de confidentialité.',
    availability: 'Recherche un stage dès mai 2027',
    internship: {
      eyebrow: 'Stage recherché',
      title: 'Stage en données et cybersécurité',
      details: [
        { icon: 'i-ri-time-line', label: 'Durée', value: '12 à 16 semaines' },
        { icon: 'i-ri-calendar-line', label: 'Début', value: 'À partir de mai 2027' },
        { icon: 'i-ri-map-pin-line', label: 'Lieu', value: 'Lille · Île-de-France' },
      ],
    },
    focus: {
      eyebrow: 'Profil technique',
      title: 'Données et cybersécurité',
      details: [
        {
          icon: 'i-ri-graduation-cap-line',
          label: 'Formation',
          value: 'IMT Nord Europe · Cycle ingénieur',
        },
        {
          icon: 'i-ri-shield-check-line',
          label: 'Approche',
          value: 'Analyser · Automatiser · Sécuriser',
        },
        { icon: 'i-ri-map-pin-line', label: 'Lieu', value: 'Lille · Île-de-France' },
      ],
    },
    contactCta: 'Prendre contact',
    aboutTitle: 'À propos',
    about: [
      'Intéressé par les données et la cybersécurité, j’ai consacré deux stages à la modernisation d’outils internes utilisés au quotidien, avec une exigence de fiabilité et de confidentialité.',
      'Je souhaite approfondir l’analyse de données et la sécurité des systèmes d’information, sur des projets concrets au sein d’une équipe expérimentée. En parallèle, j’administre le serveur qui héberge mes projets : déploiement continu, HTTPS, en-têtes de sécurité et supervision.',
    ],
    experienceTitle: 'Expériences',
    experience: [
      {
        title: 'Stage · Développement logiciel et données',
        organization: 'DGFiP · Mission Risques et Audit',
        period: 'Juin – août 2026',
        location: 'Paris',
        thumbnail: '/images/dgfip-emblem.png',
        bullets: [
          'Refonte d’une application Python/Tkinter d’aide à l’audit de paiements (architecture, interface).',
          'Traitement de corpus de plusieurs millions de lignes avec DuckDB et SQLite, en supprimant les calculs redondants.',
          'Développement de la recherche plein texte et multicritère, du contrôle des comptes et d’un assistant de rapport.',
          'Démarche itérative par lots avec l’équipe et les auditeurs, tests de bout en bout et documentation.',
        ],
      },
      {
        title: 'Stage · Amélioration d’un outil interne de suivi des essais',
        organization: 'Nidec Leroy-Somer · Bureau d’études',
        period: 'Janv. – févr. 2025',
        location: 'Angoulême',
        thumbnail: '/images/leroy-somer-logo.png',
        bullets: [
          'Analyse des besoins des techniciens et ingénieurs utilisant un outil Excel/VBA de suivi des essais.',
          'Fiabilisation des traitements de données et des méthodes de calcul, refonte de l’interface utilisateur.',
          'Développement de nouvelles fonctionnalités en VBA et validation des résultats sur données réelles.',
        ],
      },
      {
        title: 'Équipe technique bénévole',
        organization: 'Rubik’s Network',
        period: 'Nov. 2022 – Présent',
        location: 'À distance',
        thumbnail: '/images/rubiks.png',
        bullets: [
          'Rédaction de spécifications et coordination des mises à jour avec développeurs et graphistes.',
          'Développement de fonctionnalités, support utilisateur et priorisation des problèmes signalés.',
        ],
      },
    ],
    educationTitle: 'Formation',
    education: [
      {
        institution: 'IMT Nord Europe · École Mines-Télécom',
        title: 'Diplôme d’ingénieur généraliste · 1re année du cycle ingénieur (Bac+3)',
        period: '2024 – 2029',
        location: 'Lille',
        thumbnail: '/images/imt-logo.png',
        details: [
          'Cours : bases de données et SQL, réseaux, probabilités et statistiques, algorithmique.',
          'Projet en équipe sur 7 mois pour une start-up, en tant que responsable informatique : dispositif de démonstration d’un capteur (octobre 2026 – avril 2027, en cours).',
          'MOOC Gestion de projet (octobre 2026) : méthode Scrum.',
          'Cycle préparatoire intégré validé en 2026.',
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
        title: 'Programmation',
        description: 'Langages utilisés pour l’analyse de données et le développement.',
        items: ['Python', 'SQL', 'C', 'TypeScript', 'JavaScript', 'VBA'],
      },
      {
        title: 'Données',
        description: 'Stockage, requêtes et analyse de données.',
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
          'Excel avancé',
          'CaseWare IDEA',
        ],
      },
      {
        title: 'Web',
        description: 'Applications web et API.',
        items: ['Node.js', 'Express', 'Nuxt', 'Vue.js', 'API REST'],
      },
      {
        title: 'Système et sécurité',
        description: 'Administration d’un serveur, déploiement et supervision.',
        items: ['Linux', 'Docker', 'CI/CD', 'HTTPS', 'En-têtes de sécurité', 'Grafana'],
      },
      {
        title: 'Outils',
        description: 'Outils utilisés pour développer, tester et collaborer.',
        items: ['Git', 'GitHub', 'IDE JetBrains', 'Agents IA', 'Postman', 'Jira'],
      },
      {
        title: 'Méthodes',
        description: 'Conduite d’un projet avec une équipe.',
        items: [
          'Analyse du besoin',
          'Gestion de projet agile',
          'Tests et recette',
          'Documentation utilisateur',
        ],
      },
    ],
    projectsTitle: 'Quelques projets',
    projectsDescription:
      'Sélection de projets personnels et techniques réalisés en parallèle du parcours académique.',
    allProjects: 'Voir tous les projets',
    languagesTitle: 'Langues',
    languages: [
      { name: 'Français', level: 'Natif · Certificat Voltaire 657', value: 100 },
      { name: 'Anglais', level: 'B2 · TOEIC 925', value: 75 },
      { name: 'Espagnol', level: 'A2', value: 35 },
    ],
    interestsTitle: 'Centres d’intérêt',
    interests: ['Veille technologique', 'Natation', 'Cinéma', 'Voyages', 'Billard', 'Jeux vidéo'],
    contactTitle: 'Contact',
    contactDescription: 'Pour un stage, un échange technique ou toute autre demande.',
    locationLabel: 'Localisation',
    location: 'Lille · Île-de-France',
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
      to: 'https://www.linkedin.com/in/wissembadraoui/',
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
        'Stage à Paris : refonte d’une application Python d’aide à l’audit de paiements, traitement de corpus de plusieurs millions de lignes avec DuckDB et SQLite, recherche plein texte et multicritère.',
    },
    omni: {
      title: 'Omni',
      description:
        'Application Windows qui convertit localement les fichiers d’un jeu que l’on possède en contenu Garry’s Mod (props, modèles de joueur, textures) et en modèles glTF, avec une visionneuse qui vérifie chaque modèle. Cœur en Rust, orchestration en Python, interface Nuxt.',
    },
    'ameli-extract': {
      title: 'AmeliExtract',
      description:
        'Outil Python qui convertit en JSON, en local, les relevés de paiement de l’Assurance Maladie au format PDF texte, sans l’identité de l’assuré : nom, NIR et adresse sont écartés, les totaux sont contrôlés et les documents inconnus refusés plutôt que devinés.',
    },
    infrastructure: {
      title: 'Infrastructure auto-hébergée',
      description:
        'Serveur Linux auto-administré qui héberge tous les produits : services Docker, intégration continue Woodpecker et déploiement sur Dokploy, HTTPS, en-têtes de sécurité et limitation de débit, supervision avec Grafana.',
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
    'nidec-test-tool': {
      title: 'Outil interne de suivi des essais (Nidec Leroy-Somer)',
      description:
        'Amélioration d’un outil Excel/VBA du bureau d’études pour le suivi des essais : traitements de données et calculs fiabilisés, interface refondue et nouvelles fonctionnalités.',
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
  uiShowcase: {
    repo: 'Voir le code',
    facts: ['Nuxt Layer', 'Nuxt UI 4', 'Tailwind CSS 4', 'Paquet public'],
    sections: {
      colors: {
        title: 'Couleurs',
        description:
          'Quatre palettes d’accent, à changer ici pour voir toute la page suivre. Prune est celle par défaut ; les couleurs de statut restent celles de Tailwind.',
      },
      typography: {
        title: 'Typographie',
        description:
          'Funnel Display pour les titres, Funnel Sans pour le texte, Geist Mono pour les libellés et le code, servies par le paquet.',
      },
      buttons: {
        title: 'Boutons',
        description:
          'Aucun aplat : le bouton principal est en verre violet, le secondaire en contour violet.',
      },
      glass: {
        title: 'Verre',
        description:
          'Une carte statique répond au pointeur par un halo violet. Une carte interactive se soulève et prend un bord violet.',
      },
      components: {
        title: 'Composants d’application',
        description:
          'Les briques communes des applications privées : chiffres clés, pastilles, sélecteur de vue et état vide.',
      },
      forms: {
        title: 'Formulaires',
        description:
          'Champs, listes et interrupteurs de Nuxt UI, avec un seul anneau violet au focus.',
      },
      install: {
        title: 'Installation',
        description:
          'Le paquet est public sur GitHub Packages. Le registre npm de GitHub demande tout de même un jeton avec read:packages.',
      },
    },
    colors: {
      brand: 'Gamme de l’accent',
      status: 'Statuts',
      paletteLabel: 'Palette de l’accent',
      palettes: {
        plum: 'Prune',
        amethyst: 'Améthyste',
        dusk: 'Crépuscule',
        electric: 'Électrique',
      },
    },
    typography: {
      sans: 'Funnel Display · Funnel Sans',
      mono: 'Geist Mono',
      heading: 'Des interfaces sobres et lisibles',
      body: 'Un système partagé garde les mêmes réflexes d’une application à l’autre : couleurs, espacements, états et animations.',
    },
    buttons: {
      primary: 'Principal',
      secondary: 'Secondaire',
      outline: 'Contour',
      ghost: 'Discret',
      link: 'Lien',
      disabled: 'Désactivé',
    },
    glass: {
      staticTitle: 'Carte statique',
      staticText: 'Survolez-la : le halo suit le pointeur, sous le verre.',
      interactiveTitle: 'Carte interactive',
      interactiveText: 'Elle mène quelque part : elle se soulève et son bord devient violet.',
      interactiveAction: 'Voir les projets',
    },
    components: {
      example: 'Données d’exemple',
      statsLabel: 'Chiffres clés',
      stats: [
        { label: 'Suivies', value: '128', tone: 'primary' },
        { label: 'Nouvelles', value: '12', tone: 'info' },
        { label: 'À relancer', value: '5', tone: 'warning' },
        { label: 'Retenues', value: '3', tone: 'success' },
      ],
      pills: [
        { label: 'Nouveau', tone: 'info' },
        { label: 'En cours', tone: 'primary' },
        { label: 'Validé', tone: 'success' },
        { label: 'À relancer', tone: 'warning' },
        { label: 'Refusé', tone: 'error' },
        { label: 'Archivé', tone: 'neutral' },
      ],
      segmentedLabel: 'Affichage',
      segments: [
        { label: 'Liste', value: 'list', icon: 'i-ri-list-check' },
        { label: 'Grille', value: 'grid', icon: 'i-ri-layout-grid-line' },
      ],
      emptyTitle: 'Aucun résultat',
      emptyDescription: 'Aucun élément ne correspond à ces filtres.',
      emptyAction: 'Réinitialiser',
    },
    forms: {
      name: 'Nom',
      namePlaceholder: 'Votre nom',
      topic: 'Sujet',
      topics: ['Stage', 'Projet', 'Autre'],
      notify: 'Recevoir une copie',
      agree: 'J’ai lu la politique de confidentialité',
      submit: 'Envoyer',
      submitted: 'Formulaire d’exemple : rien n’a été envoyé.',
    },
    install: { npmrc: 'Fichier .npmrc de l’utilisateur', config: 'nuxt.config.ts' },
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
    privacyNotice: 'Les informations saisies servent uniquement au traitement de votre demande.',
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
    updated: '17 novembre 2026',
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
        title: 'Mesure d’audience',
        paragraphs: [
          'Le site mesure sa fréquentation avec Plausible Analytics, un outil sans cookie installé sur un serveur de l’éditeur (analytics.wissem.pro).',
          'Données traitées : page consultée, site de provenance, navigateur, système, type d’appareil et pays, ainsi que les clics vers des sites externes et les envois du formulaire de contact. Les téléchargements du CV sont comptés par le serveur du site (événement « CV download », avec la langue et la version du CV), sans les robots ni les clients en ligne de commande.',
          'Les événements passent par l’adresse du site (chemin /_w), qui les transmet à Plausible avec votre adresse IP. Plausible ne la conserve pas : avec le navigateur, elle sert à calculer un identifiant renouvelé chaque jour, qui ne permet pas de vous reconnaître d’un jour à l’autre. Seules des statistiques agrégées sont conservées.',
          'Finalité : connaître la fréquentation du site et l’intérêt pour le CV. Base légale : l’intérêt légitime de l’éditeur. Ces statistiques ne sont ni recoupées avec d’autres sites ni transmises à des tiers.',
        ],
      },
      {
        title: 'Cookies',
        paragraphs: [
          'Le site dépose deux cookies de préférence, valables 12 mois : wsm_locale (langue) et wsm_theme (thème clair ou sombre). Ils ne servent à rien d’autre et ne demandent pas de consentement. La mesure d’audience ne dépose aucun cookie.',
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
