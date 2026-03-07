export default defineAppConfig({
	navigation: [{
		label: 'Accueil',
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
	}],
	profile: {
		picture: {
			dark: 'images/Logo_White.svg',
			light: 'images/Logo_Black.svg',
			alt: 'Signature visuelle de Wissem Badraoui'
		},
		cv: {
			href: '/files/74b87337454200d4d33f80c4663dc5e5.pdf',
			filename: 'CV_Wissem_BADRAOUI.pdf'
		}
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
		credits: `© ${new Date().getFullYear()} Wissem. • Tous droits réservés.`
	}
})
