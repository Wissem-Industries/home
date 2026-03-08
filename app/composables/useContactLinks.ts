import { computed } from 'vue'
import type { ContactLinkContent } from '~~/shared/content'

function pickLinks(links: ContactLinkContent[], ids: string[]) {
	const linksById = new Map(links.map(link => [link.id, link]))
	return ids
		.map(id => linksById.get(id))
		.filter((link): link is ContactLinkContent => Boolean(link))
}

export function useContactLinks() {
	const content = useSiteContent()

	const contact = computed(() => content.value.cv.contact)
	const allLinks = computed(() => contact.value.links)
	const directLinks = computed(() => pickLinks(allLinks.value, contact.value.directLinkIds))
	const heroLinks = computed(() => pickLinks(allLinks.value, contact.value.heroLinkIds))
	const primaryLinks = computed(() => pickLinks(allLinks.value, contact.value.primaryLinkIds))
	const footerLinks = computed(() => pickLinks(allLinks.value, contact.value.footerLinkIds))

	return {
		contact,
		allLinks,
		directLinks,
		heroLinks,
		primaryLinks,
		footerLinks
	}
}
