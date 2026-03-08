<script setup lang="ts">
type SkillsGroup = {
	title: string
	description: string
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
			container: '!pt-0 !pb-16 !gap-6',
			title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium'
		}"
	>
		<UPageGrid class="lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
			<Motion
				v-for="(group, index) in groups"
				:key="group.title"
				:initial="{ opacity: 0, transform: 'translateY(20px)' }"
				:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
				:transition="{ delay: 0.05 * index }"
				:in-view-options="{ once: true }"
				class="h-full"
			>
				<UCard
					class="h-full"
					:ui="{
						root: 'h-full rounded-2xl flex flex-col',
						header: 'p-5 sm:p-6 pb-2 sm:pb-3 flex flex-col items-center justify-center text-center',
						body: 'px-5 sm:px-6 pb-5 sm:pb-6 flex-1 flex items-center justify-center'
					}"
				>
					<template #header>
						<h3 class="text-base font-medium text-highlighted text-center">{{ group.title }}</h3>
						<p class="text-sm leading-6 text-muted text-center">{{ group.description }}</p>
					</template>

					<div class="flex flex-wrap items-center justify-center gap-2">
						<UBadge
							v-for="item in group.items"
							:key="`${group.title}-${item}`"
							:label="item"
							color="primary"
							variant="subtle"
							size="sm"
							class="rounded-md"
						/>
					</div>
				</UCard>
			</Motion>
		</UPageGrid>
	</UPageSection>
</template>
