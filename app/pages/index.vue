<script setup lang="ts">
const content = useSiteContent()
const { contact, directLinks, heroLinks, primaryLinks } = useContactLinks()
const { downloadFile } = useFileDownload()
const { inViewOptions, revealInitial, revealTransition, revealVisible } = useMotionPresets()

const page = computed(() => content.value.pages.home)
const cv = computed(() => content.value.cv)
const projects = computed(() => content.value.projects)
const infoCardUi = {
	root: 'h-full rounded-2xl flex flex-col',
	header: 'p-5 sm:p-6 pb-3',
	body: 'px-5 sm:px-6 pb-5 sm:pb-6 pt-0',
	footer: 'my-auto flex justify-center'
}

const featuredProjects = computed(() => {
	const featuredIds = new Set(cv.value.projects.featured)
	return projects.value.filter(project => featuredIds.has(project.id))
})

usePageSeo(computed(() => ({
	title: page.value.seo?.title || page.value.title,
	description: page.value.seo?.description || page.value.description
})))

function onDownloadResume() {
	downloadFile(cv.value.resume.href, cv.value.resume.filename, cv.value.resume.downloadStartedMessage)
}
</script>

<template>
	<UPage v-if="page && cv">
		<HomeHeroSection
			:name="cv.name"
			:avatar-alt="cv.hero.avatarAlt"
			:status="cv.hero.status"
			:objective="cv.hero.objective"
			:description="cv.hero.description"
			:resume-label="cv.resume.label"
			:resume-href="cv.resume.href"
			:resume-filename="cv.resume.filename"
			:resume-message="cv.resume.downloadStartedMessage"
			:secondary-cta-label="cv.hero.secondaryCtaLabel"
			:secondary-cta-to="cv.hero.secondaryCtaTo"
			:links="heroLinks"
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
			:description="cv.projects.description"
			:actions="cv.projects.actions"
			:projects="featuredProjects"
		/>

		<UPageSection>
			<div class="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6">
				<div class="grid gap-5">
					<Motion
						:initial="revealInitial"
						:while-in-view="revealVisible"
						:transition="revealTransition(0)"
						:in-view-options="inViewOptions"
					>
						<UCard :ui="infoCardUi">
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
											<UBadge
												variant="soft"
												size="sm"
												class="rounded-full"
											>
												{{ language.level }}
											</UBadge>
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
						:initial="revealInitial"
						:while-in-view="revealVisible"
						:transition="revealTransition(1)"
						:in-view-options="inViewOptions"
					>
						<UCard :ui="infoCardUi">
							<template #header>
								<h2 class="text-base font-medium text-highlighted">
									{{ cv.interests.title }}
								</h2>
							</template>

							<div class="flex flex-wrap items-center justify-center content-center gap-2">
								<UBadge
									v-for="interest in cv.interests.items"
									:key="interest"
									:label="interest"
									variant="subtle"
									size="sm"
									class="rounded-md"
								/>
							</div>
						</UCard>
					</Motion>
				</div>

				<Motion
					:initial="revealInitial"
					:while-in-view="revealVisible"
					:transition="revealTransition(2)"
					:in-view-options="inViewOptions"
					class="h-full"
				>
					<UCard
						class="h-full"
						:ui="infoCardUi"
					>
						<template #header>
							<div class="space-y-2">
								<h2 class="text-base font-medium text-highlighted">
									{{ contact.title }}
								</h2>

								<p class="max-w-xl text-sm leading-6 text-muted">
									{{ contact.description }}
								</p>
							</div>
						</template>

						<ContactDetailsList
							:location-label="contact.locationLabel"
							:location="contact.location"
							:links="directLinks"
						/>

						<template #footer>
							<div class="flex flex-col gap-3">
								<div class="flex flex-wrap gap-3">
									<UButton
										v-for="link in primaryLinks"
										:key="link.id"
										:label="link.label"
										color="neutral"
										variant="outline"
										:icon="link.icon"
										class="min-w-[140px] flex-1 justify-center sm:flex-none"
										:to="link.to"
										external
										target="_blank"
									/>
								</div>

								<UButton
									:label="cv.resume.label"
									variant="outline"
									icon="i-carbon-download"
									class="w-full justify-center"
									@click="onDownloadResume"
								/>
							</div>
						</template>
					</UCard>
				</Motion>
			</div>
		</UPageSection>
	</UPage>
</template>
