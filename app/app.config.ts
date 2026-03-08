export default defineAppConfig({
	profile: {
		picture: {
			dark: '/images/Logo_White.svg',
			light: '/images/Logo_Black.svg'
		}
	},
	ui: {
		colors: {
			primary: 'violet',
			neutral: 'neutral'
		},
		pageHero: {
			slots: {
				container: '!pt-16 !pb-10 !gap-4 !sm:pt-24 !sm:pb-12',
				title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
				description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
			}
		},
		pageSection: {
			slots: {
				container: '!pt-0 !pb-14 !gap-5 !sm:pb-16 !sm:gap-6',
				title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
				description: 'text-left text-sm sm:text-base leading-7 text-muted',
				links: 'justify-start'
			}
		}
	}
})
