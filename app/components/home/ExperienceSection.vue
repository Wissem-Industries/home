<script setup lang="ts">
type ExperienceItem = {
	title: string
	organization: string
	type: string
	period: string
	location?: string
	url?: string
	bullets: string[]
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
			container: '!pt-0',
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
							<p class="text-xs uppercase tracking-wide text-muted">
								{{ experience.type }}
							</p>
							<h3 class="text-base font-medium text-highlighted">
								{{ experience.title }}
							</h3>
							<ULink
								v-if="experience.url"
								:to="experience.url"
								target="_blank"
								class="text-sm text-primary hover:underline"
							>
								{{ experience.organization }}
							</ULink>
							<p
								v-else
								class="text-sm font-medium"
							>
								{{ experience.organization }}
							</p>
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

					<div class="shrink-0 space-y-1 text-sm text-muted lg:text-right">
						<p>{{ experience.period }}</p>
						<p v-if="experience.location">
							{{ experience.location }}
						</p>
					</div>
				</div>
			</Motion>
		</UPageList>
	</UPageSection>
</template>
