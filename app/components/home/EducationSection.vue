<script setup lang="ts">
type EducationItem = {
	institution: string
	title: string
	period: string
	location?: string
	details: string[]
}

defineProps<{
	title: string
	items: EducationItem[]
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
		<UPageGrid>
			<Motion
				v-for="(item, index) in items"
				:key="`${item.institution}-${item.period}`"
				:initial="{ opacity: 0, transform: 'translateY(20px)' }"
				:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
				:transition="{ delay: 0.1 * index }"
				:in-view-options="{ once: true }"
			>
				<UCard :ui="{ body: 'p-6 sm:p-7 space-y-4' }">
					<div class="space-y-1">
						<p class="text-xs uppercase tracking-wide text-muted">
							{{ item.period }}
						</p>
						<h3 class="text-base font-medium text-highlighted">
							{{ item.institution }}
						</h3>
						<p class="text-sm font-medium">
							{{ item.title }}
						</p>
						<p
							v-if="item.location"
							class="text-sm text-muted"
						>
							{{ item.location }}
						</p>
					</div>

					<ul class="space-y-2 text-sm text-muted">
						<li
							v-for="detail in item.details"
							:key="detail"
							class="flex gap-2"
						>
							<span class="mt-1 size-1.5 rounded-full bg-primary/60 shrink-0" />
							<span>{{ detail }}</span>
						</li>
					</ul>
				</UCard>
			</Motion>
		</UPageGrid>
	</UPageSection>
</template>
