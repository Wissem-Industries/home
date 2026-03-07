import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const seoSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional()
})

const pageSchema = z.object({
	title: z.string(),
	description: z.string(),
	seo: seoSchema.optional()
})

const cvLinkSchema = z.object({
	label: z.string(),
	value: z.string(),
	to: z.string(),
	icon: z.string()
})

const cvExperienceSchema = z.object({
	title: z.string(),
	organization: z.string(),
	type: z.string(),
	period: z.string(),
	location: z.string().optional(),
	url: z.string().optional(),
	bullets: z.array(z.string())
})

const cvEducationSchema = z.object({
	institution: z.string(),
	title: z.string(),
	period: z.string(),
	location: z.string().optional(),
	details: z.array(z.string())
})

const cvSkillsGroupSchema = z.object({
	title: z.string(),
	items: z.array(z.string())
})

const cvLanguageSchema = z.object({
	name: z.string(),
	level: z.string()
})

export default defineContentConfig({
	collections: {
		home: defineCollection({
			type: 'page',
			source: 'home.yml',
			schema: pageSchema
		}),
		pageMeta: defineCollection({
			type: 'page',
			source: [
				{ include: 'projects.yml' },
				{ include: 'contact.yml' }
			],
			schema: pageSchema
		}),
		projects: defineCollection({
			type: 'data',
			source: 'projects/*.yml',
			schema: z.object({
				id: z.string().nonempty(),
				title: z.string().nonempty(),
				description: z.string().nonempty(),
				image: z.string().nonempty().editor({ input: 'media' }),
				url: z.string().optional(),
				repo: z.string().optional(),
				tags: z.array(z.string()),
				date: z.string(),
				featured: z.boolean().optional()
			})
		}),
		cv: defineCollection({
			type: 'data',
			source: 'cv.yml',
			schema: z.object({
				name: z.string(),
				hero: z.object({
					status: z.string(),
					objective: z.string(),
					description: z.string(),
					secondaryCtaLabel: z.string(),
					secondaryCtaTo: z.string()
				}),
				about: z.object({
					title: z.string(),
					paragraphs: z.array(z.string())
				}),
				experience: z.object({
					title: z.string(),
					items: z.array(cvExperienceSchema)
				}),
				education: z.object({
					title: z.string(),
					items: z.array(cvEducationSchema)
				}),
				skills: z.object({
					title: z.string(),
					groups: z.array(cvSkillsGroupSchema)
				}),
				projects: z.object({
					title: z.string(),
					description: z.string(),
					featured: z.array(z.string())
				}),
				languages: z.object({
					title: z.string(),
					items: z.array(cvLanguageSchema)
				}),
				interests: z.object({
					title: z.string(),
					items: z.array(z.string())
				}),
				contact: z.object({
					title: z.string(),
					description: z.string(),
					email: z.string(),
					location: z.string(),
					links: z.array(cvLinkSchema)
				})
			})
		})
	}
})
