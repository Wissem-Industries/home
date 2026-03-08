<script setup lang="ts">
import { downloadFile } from '~/utils/download'

const { profile } = useAppConfig()
const content = useSiteContent()
const page = computed(() => content.value.pages.home)
const cv = computed(() => content.value.cv)
const projects = computed(() => content.value.projects)

const featuredProjects = computed(() => {
	const featuredIds = new Set(cv.value.projects.featured)
	return projects.value.filter(project => featuredIds.has(project.id))
})

const publicLinks = computed(() => cv.value.contact.links)

useSeoMeta({
	title: page.value.seo?.title || page.value.title,
	ogTitle: page.value.seo?.title || page.value.title,
	description: page.value.seo?.description || page.value.description,
	ogDescription: page.value.seo?.description || page.value.description
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

		<HomeProjectsSection
			v-if="featuredProjects.length"
			:title="cv.projects.title"
			:projects="featuredProjects"
		/>

		<UPageSection :ui="{ container: '!pt-0 !pb-8 !gap-0' }">
			<div class="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6">
				<div class="grid gap-4">
					<Motion
						:initial="{ opacity: 0, transform: 'translateY(16px)' }"
						:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
						:transition="{ delay: 0.05 }"
						:in-view-options="{ once: true }"
					>
						<UCard
							:ui="{
								root: 'rounded-2xl',
								header: 'p-5 sm:p-5',
								body: 'px-5 sm:px-6 pb-5 sm:pb-6 pt-0'
							}"
						>
							<template #header>
								<h2 class="text-base font-medium text-highlighted">
									{{ cv.languages.title }}
								</h2>
							</template>

							<div class="space-y-3">
								<div
									v-for="language in cv.languages.items"
									:key="language.name"
									class="rounded-xl border border-default/50 p-3"
								>
									<div class="mb-2 flex items-center justify-between gap-4">
										<span class="text-sm font-medium text-default">
											{{ language.name }}
										</span>

										<span class="text-xs text-muted">
											{{ language.level }}
										</span>
									</div>

									<UProgress
										:model-value="language.value"
										size="sm"
									/>
								</div>
							</div>
						</UCard>
					</Motion>

					<Motion
						:initial="{ opacity: 0, transform: 'translateY(16px)' }"
						:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
						:transition="{ delay: 0.1 }"
						:in-view-options="{ once: true }"
					>
						<UCard
							:ui="{
								root: 'rounded-2xl',
								header: 'p-5 sm:p-5',
								body: 'px-5 sm:px-6 pb-5 sm:pb-6 pt-0'
							}"
						>
							<template #header>
								<h2 class="text-base font-medium text-highlighted">
									{{ cv.interests.title }}
								</h2>
							</template>

							<div class="flex flex-wrap gap-2">
								<UBadge
									v-for="interest in cv.interests.items"
									:key="interest"
									:label="interest"
									color="neutral"
									variant="soft"
									size="sm"
									class="rounded-md"
								/>
							</div>
						</UCard>
					</Motion>
				</div>

				<Motion
					:initial="{ opacity: 0, transform: 'translateY(16px)' }"
					:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
					:transition="{ delay: 0.15 }"
					:in-view-options="{ once: true }"
					class="h-full"
				>
					<UCard
						class="h-full"
						:ui="{
							root: 'h-full rounded-2xl flex flex-col',
							header: 'p-5 sm:p-6 pb-3',
							body: 'px-5 sm:px-6 pb-5 sm:pb-6 pt-0',
							footer: 'px-5 sm:px-6  my-auto '
						}"
					>
						<template #header>
							<div class="space-y-2">
								<h2 class="text-base font-medium text-highlighted">
									{{ cv.contact.title }}
								</h2>

								<p class="max-w-xl text-sm leading-6 text-muted">
									{{ cv.contact.description }}
								</p>
							</div>
						</template>

						<div class="space-y-3">
							<div class="flex items-start gap-3 rounded-xl border border-default/50 p-3">
								<div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
									<UIcon
										name="i-lucide-map-pin"
										class="size-4 text-primary"
									/>
								</div>

								<div class="min-w-0">
									<p class="text-[11px] uppercase tracking-[0.18em] text-muted">
										Localisation
									</p>

									<p class="mt-1 text-sm font-medium text-default">
										{{ cv.contact.location }}
									</p>
								</div>
							</div>

							<div
								v-for="link in cv.contact.links"
								:key="link.to"
								class="flex items-start gap-3 rounded-xl border border-default/50 p-3"
							>
								<div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
									<UIcon
										:name="link.icon"
										class="size-4 text-primary"
									/>
								</div>

								<div class="min-w-0">
									<p class="text-[11px] uppercase tracking-[0.18em] text-muted">
										{{ link.label }}
									</p>

									<ULink
										:to="link.to"
										:target="link.to.startsWith('http') ? '_blank' : undefined"
										class="mt-1 block break-all text-sm font-medium text-primary hover:underline"
									>
										{{ link.value }}
									</ULink>
								</div>
							</div>
						</div>

						<template #footer>
							<div class="flex flex-col gap-3">
								<div class="grid grid-cols-2 gap-3">
									<UButton
										label="LinkedIn"
										color="neutral"
										variant="outline"
										icon="i-simple-icons-linkedin"
										class="w-full justify-center"
										target="_blank"
										:to="cv.contact.linkedin"
									/>

									<UButton
										label="GitHub"
										color="neutral"
										variant="outline"
										icon="i-simple-icons-github"
										class="w-full justify-center"
										target="_blank"
										:to="cv.contact.github"
									/>
								</div>

								<UButton
									label="Télécharger le CV (PDF)"
									color="neutral"
									variant="subtle"
									icon="i-carbon-download"
									class="w-full justify-center"
									@click="downloadFile(profile.cv.href, profile.cv.filename)"
								/>
							</div>
						</template>
					</UCard>
				</Motion>
			</div>
		</UPageSection>
	</UPage>
</template>
