export const siteRoutes = {
	home: '/',
	projects: '/projects',
	contact: '/contact'
} as const

export const staticSiteRoutes = Object.values(siteRoutes)
