<script setup lang="ts">
type ExperienceItem = {
	title: string
	organization: string
	period: string
	location?: string
	thumbnail?: string
	url?: string
	bullets: string[]
}

function getThumbnailSrc(thumbnail?: string) {
	if (!thumbnail) {
		return null
	}

	return thumbnail.startsWith('/') ? thumbnail : `/${thumbnail}`
}

defineProps<{
	title: string
	items: ExperienceItem[]
}>()
</script>

<template>
	<UPageSection
		:title="title"
		:ui="{
			container: '!pb-16 !gap-8 pt-0',
			title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium'
		}"
	>
		<UPageList
			divide
			class="w-full"
		>
			<Motion
				v-for="(experience, index) in items"
				:key="`${experience.organization}-${experience.period}`"
				:initial="{ opacity: 0, transform: 'translateY(20px)' }"
				:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
				:transition="{ delay: 0.1 * index }"
				:in-view-options="{ once: true }"
				class="py-6 first:pt-0 last:pb-0"
			>
				<div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
					<div class="max-w-3xl space-y-3">
						<div class="space-y-1">
							<ULink
								v-if="experience.url"
								:to="experience.url"
								target="_blank"
								class="text-xs font-medium uppercase tracking-[0.18em] text-muted transition-colors hover:text-highlighted"
							>
								{{ experience.organization }}
							</ULink>
							<p
								v-else
								class="text-xs font-medium uppercase tracking-[0.18em] text-muted"
							>
								{{ experience.organization }}
							</p>
							<h3 class="text-base font-medium text-highlighted">
								{{ experience.title }}
							</h3>
						</div>

						<ul class="space-y-2 text-sm text-muted">
							<li
								v-for="bullet in experience.bullets"
								:key="bullet"
								class="flex gap-2"
							>
								<span class="mt-1 size-1.5 rounded-full bg-primary/60 shrink-0" />
								<span>{{ bullet }}</span>
							</li>
						</ul>
					</div>

					<div class="shrink-0 lg:pl-6">
						<div class="flex items-start gap-3 lg:justify-end">
							<img
								v-if="experience.thumbnail"
								:src="getThumbnailSrc(experience.thumbnail) || undefined"
								:alt="`Logo ${experience.organization}`"
								loading="lazy"
								decoding="async"
								class="size-11 rounded-xl border border-default bg-default/30 object-contain p-1.5"
							>

							<div class="space-y-1 text-sm text-muted">
								<p class="flex items-center gap-2 lg:justify-end">
									<UIcon
										name="i-lucide-calendar-range"
										class="size-4 shrink-0 text-primary/80"
									/>
									<span>{{ experience.period }}</span>
								</p>

								<p
									v-if="experience.location"
									class="flex items-center gap-2 lg:justify-end"
								>
									<UIcon
										name="i-lucide-map-pin"
										class="size-4 shrink-0 text-primary/80"
									/>
									<span>{{ experience.location }}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</Motion>
		</UPageList>
	</UPageSection>
</template>
