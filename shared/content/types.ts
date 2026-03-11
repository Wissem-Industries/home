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

export type NavigationContent = {
	home: string
	projects: string
	contact: string
}

export type FooterContent = {
	creditsSuffix: string
}

export type ColorModeContent = {
	switchToDark: string
	switchToLight: string
}

export type ErrorContent = {
	title: string
	description: string
}

export type SiteMetaContent = {
	titleTemplate: string
	applicationName: string
	ogSiteName: string
}

export type SeoPersonContent = {
	name: string
	alternateName: string
	description: string
	alumniOf?: string
}

export type SiteSeoContent = {
	defaultTitle: string
	defaultDescription: string
	defaultImage: string
	defaultImageAlt: string
	person: SeoPersonContent
}

export type TimelineContent = {
	logoAltPrefix: string
}

export type LocaleSwitcherContent = {
	switchToEnglish: string
	switchToFrench: string
}

export type UiContent = {
	navigation: NavigationContent
	footer: FooterContent
	colorMode: ColorModeContent
	error: ErrorContent
	meta: SiteMetaContent
	timeline: TimelineContent
	localeSwitcher: LocaleSwitcherContent
}

export type ContactLinkContent = {
	id: string
	label: string
	value: string
	to: string
	icon: string
}

export type DownloadAssetContent = {
	label: string
	href: string
	filename: string
	downloadStartedMessage: string
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
	thumbnail?: string
	url?: string
	details: string[]
}

export type SkillsGroupContent = {
	title: string
	description: string
	items: string[]
}

export type LanguageContent = {
	name: string
	level: string
	value: number
}

export type HeroContent = {
	avatarAlt: string
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

export type ProjectActionLabelsContent = {
	view: string
	repo: string
	private: string
}

export type ProjectsPreviewContent = {
	title: string
	description: string
	linkLabel: string
	featured: string[]
	actions: ProjectActionLabelsContent
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
	locationLabel: string
	location: string
	directLinkIds: string[]
	heroLinkIds: string[]
	primaryLinkIds: string[]
	footerLinkIds: string[]
	links: ContactLinkContent[]
}

export type CvContent = {
	name: string
	hero: HeroContent
	resume: DownloadAssetContent
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
}

export type ContactFormFieldContent = {
	label: string
	placeholder: string
}

export type ContactFormValidationContent = {
	nameTooShort: string
	emailInvalid: string
	subjectTooShort: string
	messageTooShort: string
}

export type ContactFormMessagesContent = {
	successTitle: string
	successDescription: string
	errorTitle: string
	errorDescription: string
}

export type ContactFormContent = {
	name: ContactFormFieldContent
	email: ContactFormFieldContent
	subject: ContactFormFieldContent
	message: ContactFormFieldContent
	submitLabel: string
	validation: ContactFormValidationContent
	messages: ContactFormMessagesContent
	responseHint: string
	privacyHint: string
	privacyAriaLabel: string
}

export type ContactApiContent = {
	tooManyRequests: string
	invalidForm: string
	serviceUnavailable: string
	telegramSubjectFallback: string
	telegramHeader: string
	telegramNameLabel: string
	telegramEmailLabel: string
	telegramSubjectLabel: string
	telegramMessageLabel: string
	telegramSendFailure: string
	successMessage: string
}

export type ContactPageContent = PageContent & {
	sidebar: {
		title: string
		description: string
	}
	form: ContactFormContent
	api: ContactApiContent
}

export type LocaleContent = {
	ui: UiContent
	seo: SiteSeoContent
	pages: {
		home: PageContent
		projects: PageContent
		contact: ContactPageContent
	}
	cv: CvContent
	projects: ProjectContent[]
}

export type SiteContentConfig = {
	defaultSiteLocale: SiteLocale
	availableSiteLocales: SiteLocale[]
	siteContent: Record<SiteLocale, LocaleContent>
}
