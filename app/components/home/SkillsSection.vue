<script setup lang="ts">
type SkillsGroup = {
	title: string
	items: string[]
}

defineProps<{
	title: string
	groups: SkillsGroup[]
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
				v-for="(group, index) in groups"
				:key="group.title"
				:initial="{ opacity: 0, transform: 'translateY(20px)' }"
				:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
				:transition="{ delay: 0.05 * index }"
				:in-view-options="{ once: true }"
			>
				<UCard :ui="{ body: 'p-6 sm:p-7 space-y-4' }">
					<h3 class="text-base font-medium text-highlighted">
						{{ group.title }}
					</h3>

					<div class="flex flex-wrap gap-2">
						<UBadge
							v-for="item in group.items"
							:key="item"
							:label="item"
							color="neutral"
							variant="soft"
							size="sm"
						/>
					</div>
				</UCard>
			</Motion>
		</UPageGrid>
	</UPageSection>
</template>
