<script setup lang="ts">
import { downloadFile } from '~/utils/download'

const { profile } = useAppConfig()

const { data: page } = await useAsyncData('home', () => {
	return queryCollection('home').first()
})

const { data: cv } = await useCvContent()

const { data: projects } = await useAsyncData('projects', () => {
	return queryCollection('projects').all()
})

if (!page.value || !cv.value) {
	throw createError({
		statusCode: 404,
		statusMessage: 'Page not found',
		fatal: true
	})
}

const featuredProjects = computed(() => {
	const featuredIds = new Set(cv.value?.projects.featured || [])
	return (projects.value || []).filter(project => featuredIds.has(project.id))
})

const publicLinks = computed(() => cv.value?.contact.links || [])

useSeoMeta({
	title: page.value?.seo.title || page.value?.title,
	ogTitle: page.value?.seo.title || page.value?.title,
	description: page.value?.seo.description || page.value?.description,
	ogDescription: page.value?.seo.description || page.value?.description
})
</script>

<template>
	<UPage v-if="page && cv">
		<HomeHeroSection
			:name="cv.name"
			:status="cv.hero.status"
			:objective="cv.hero.objective"
			:description="cv.hero.description"
			:secondary-cta-label="cv.hero.secondaryCtaLabel"
			:secondary-cta-to="cv.hero.secondaryCtaTo"
			:links="publicLinks"
		/>

		<HomeAboutSection
			:title="cv.about.title"
			:paragraphs="cv.about.paragraphs"
		/>

		<HomeExperienceSection
			:title="cv.experience.title"
			:items="cv.experience.items"
		/>

		<HomeEducationSection
			:title="cv.education.title"
			:items="cv.education.items"
		/>

		<HomeSkillsSection
			:title="cv.skills.title"
			:groups="cv.skills.groups"
		/>

		<HomeProjectsPreviewSection
			v-if="featuredProjects.length"
			:title="cv.projects.title"
			:description="cv.projects.description"
			:projects="featuredProjects"
		/>

		<UPageSection
			:ui="{ container: '!pt-0 lg:grid lg:grid-cols-3 lg:gap-6' }"
		>
			<Motion
				:initial="{ opacity: 0, transform: 'translateY(20px)' }"
				:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
				:transition="{ delay: 0.05 }"
				:in-view-options="{ once: true }"
			>
				<UCard :ui="{ body: 'p-6 sm:p-7 space-y-4' }">
					<h2 class="text-base font-medium text-highlighted">
						{{ cv.languages.title }}
					</h2>

					<ul class="space-y-3 text-sm text-muted">
						<li
							v-for="language in cv.languages.items"
							:key="language.name"
							class="flex items-center justify-between gap-4"
						>
							<span>{{ language.name }}</span>
							<span class="font-medium text-default">{{ language.level }}</span>
						</li>
					</ul>
				</UCard>
			</Motion>

			<Motion
				:initial="{ opacity: 0, transform: 'translateY(20px)' }"
				:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
				:transition="{ delay: 0.1 }"
				:in-view-options="{ once: true }"
			>
				<UCard :ui="{ body: 'p-6 sm:p-7 space-y-4' }">
					<h2 class="text-base font-medium text-highlighted">
						{{ cv.interests.title }}
					</h2>

					<div class="flex flex-wrap gap-2">
						<UBadge
							v-for="interest in cv.interests.items"
							:key="interest"
							:label="interest"
							color="neutral"
							variant="soft"
							size="sm"
						/>
					</div>
				</UCard>
			</Motion>

			<Motion
				:initial="{ opacity: 0, transform: 'translateY(20px)' }"
				:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
				:transition="{ delay: 0.15 }"
				:in-view-options="{ once: true }"
			>
				<UCard :ui="{ body: 'p-6 sm:p-7 space-y-5' }">
					<div class="space-y-2">
						<h2 class="text-base font-medium text-highlighted">
							{{ cv.contact.title }}
						</h2>
						<p class="text-sm text-muted">
							{{ cv.contact.description }}
						</p>
					</div>

					<div class="space-y-4 text-sm">
						<div class="flex items-center gap-3">
							<div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
								<UIcon
									name="i-lucide-map-pin"
									class="size-4 text-primary"
								/>
							</div>
							<div class="flex flex-col">
								<span class="text-xs uppercase tracking-wide text-muted">Localisation</span>
								<span class="font-medium">{{ cv.contact.location }}</span>
							</div>
						</div>

						<div
							v-for="link in cv.contact.links"
							:key="link.to"
							class="flex items-center gap-3"
						>
							<div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
								<UIcon
									:name="link.icon"
									class="size-4 text-primary"
								/>
							</div>
							<div class="flex flex-col">
								<span class="text-xs uppercase tracking-wide text-muted">{{ link.label }}</span>
								<ULink
									:to="link.to"
									:target="link.to.startsWith('http') ? '_blank' : undefined"
									class="text-sm text-primary hover:underline"
								>
									{{ link.value }}
								</ULink>
							</div>
						</div>
					</div>

					<UButton
						label="Télécharger le CV (PDF)"
						color="neutral"
						variant="subtle"
						icon="i-carbon-download"
						class="w-full justify-center"
						@click="downloadFile(profile.cv.href, profile.cv.filename)"
					/>
				</UCard>
			</Motion>
		</UPageSection>
	</UPage>
</template>
