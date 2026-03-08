export type SiteLocale = string

export type SeoContent = {
	title?: string
	description?: string
}

export type PageContent = {
	title: string
	description: string
	seo?: SeoContent
}

export type ContactLinkContent = {
	label: string
	value: string
	to: string
	icon: string
}

export type ExperienceContent = {
	title: string
	organization: string
	period: string
	location?: string
	thumbnail?: string
	url?: string
	bullets: string[]
}

export type EducationContent = {
	institution: string
	title: string
	period: string
	location?: string
	details: string[]
}

export type SkillsGroupContent = {
	title: string
	items: string[]
}

export type LanguageContent = {
	name: string
	level: string
}

export type HeroContent = {
	status: string
	objective: string
	description: string
	secondaryCtaLabel: string
	secondaryCtaTo: string
}

export type AboutContent = {
	title: string
	paragraphs: string[]
}

export type ExperienceSectionContent = {
	title: string
	items: ExperienceContent[]
}

export type EducationSectionContent = {
	title: string
	items: EducationContent[]
}

export type SkillsSectionContent = {
	title: string
	groups: SkillsGroupContent[]
}

export type ProjectsPreviewContent = {
	title: string
	description: string
	featured: string[]
}

export type LanguagesSectionContent = {
	title: string
	items: LanguageContent[]
}

export type InterestsSectionContent = {
	title: string
	items: string[]
}

export type ContactSectionContent = {
	title: string
	description: string
	email: string
	location: string
	links: ContactLinkContent[]
}

export type CvContent = {
	name: string
	hero: HeroContent
	about: AboutContent
	experience: ExperienceSectionContent
	education: EducationSectionContent
	skills: SkillsSectionContent
	projects: ProjectsPreviewContent
	languages: LanguagesSectionContent
	interests: InterestsSectionContent
	contact: ContactSectionContent
}

export type ProjectContent = {
	id: string
	title: string
	description: string
	image: string
	url?: string
	repo?: string
	tags: string[]
	date: string
	featured?: boolean
}

export type LocaleContent = {
	pages: {
		home: PageContent
		projects: PageContent
		contact: PageContent
	}
	cv: CvContent
	projects: ProjectContent[]
}
