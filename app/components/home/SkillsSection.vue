<script setup lang="ts">
const { revealInitial, revealTransition, revealVisible, inViewOptions } = useMotionPresets()

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
	<UPageSection :title="title">
		<UPageGrid class="gap-4 sm:gap-5 lg:grid-cols-2 xl:grid-cols-3">
			<Motion
				v-for="(group, index) in groups"
				:key="group.title"
				:initial="revealInitial"
				:while-in-view="revealVisible"
				:transition="revealTransition(index)"
				:in-view-options="inViewOptions"
				class="h-full"
			>
				<UCard
					class="h-full"
					:ui="{
						root: 'h-full rounded-2xl flex flex-col',
						header: 'p-5 sm:p-6 pb-2 sm:pb-3',
						body: 'px-5 sm:px-6 pb-5 sm:pb-6 pt-3 sm:pt-4 flex-1 flex items-center justify-center'
					}"
				>
					<template #header>
						<div class="space-y-2">
							<h3 class="text-base font-medium text-highlighted">
								{{ group.title }}
							</h3>

							<p class="text-sm leading-6 text-muted">
								{{ group.description }}
							</p>
						</div>
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
