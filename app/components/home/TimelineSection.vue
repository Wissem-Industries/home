<script setup lang="ts">
import { getLinkTarget, isExternalLink } from '#shared/utils/links'

type TimelineItem = {
	eyebrow: string
	title: string
	period: string
	location?: string
	thumbnail?: string
	url?: string
	bullets: string[]
}

const { revealInitial, revealTransition, revealVisible, inViewOptions } = useMotionPresets()

function getThumbnailSrc(thumbnail: string) {
	return thumbnail.startsWith('/') ? thumbnail : `/${thumbnail}`
}

defineProps<{
	title: string
	items: TimelineItem[]
}>()
</script>

<template>
	<UPageSection :title="title">
		<UPageList
			divide
			class="w-full"
		>
			<Motion
				v-for="(item, index) in items"
				:key="`${item.eyebrow}-${item.title}-${item.period}`"
				:initial="revealInitial"
				:while-in-view="revealVisible"
				:transition="revealTransition(index)"
				:in-view-options="inViewOptions"
				class="py-5 first:pt-0 last:pb-0 sm:py-6"
			>
				<div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
					<div class="max-w-3xl space-y-3">
						<div class="space-y-2">
							<ULink
								v-if="item.url"
								:to="item.url"
								:external="isExternalLink(item.url)"
								:target="getLinkTarget(item.url)"
								class="text-xs font-medium uppercase tracking-[0.18em] text-muted transition-colors hover:text-highlighted"
							>
								{{ item.eyebrow }}
							</ULink>

							<p
								v-else
								class="text-xs font-medium uppercase tracking-[0.18em] text-muted"
							>
								{{ item.eyebrow }}
							</p>

							<h3 class="text-base font-medium text-highlighted">
								{{ item.title }}
							</h3>
						</div>

						<ul class="space-y-2 text-sm text-muted">
							<li
								v-for="bullet in item.bullets"
								:key="bullet"
								class="flex gap-2.5"
							>
								<span class="mt-1 size-1.5 shrink-0 rounded-full bg-primary/60" />
								<span>{{ bullet }}</span>
							</li>
						</ul>
					</div>

					<div class="shrink-0 lg:-translate-y-4 lg:pl-6">
						<div class="flex w-full items-start justify-between gap-3 sm:gap-4 lg:flex-col lg:items-end">
							<img
								v-if="item.thumbnail"
								:src="getThumbnailSrc(item.thumbnail)"
								:alt="`Logo ${item.eyebrow}`"
								loading="lazy"
								decoding="async"
								class="h-12 w-auto max-w-[6rem] rounded-md bg-default/30 object-contain sm:h-14 sm:max-w-[7rem] lg:h-auto lg:w-28 lg:max-w-none lg:rounded-sm"
							>

							<div class="ml-auto space-y-1 text-right text-sm text-muted lg:ml-0 lg:text-right">
								<p class="flex items-center justify-end gap-2">
									<UIcon
										name="i-lucide-calendar-range"
										class="size-4 shrink-0 text-primary/80"
									/>
									<span class="min-w-0 break-words">{{ item.period }}</span>
								</p>

								<p
									v-if="item.location"
									class="flex items-center justify-end gap-2"
								>
									<UIcon
										name="i-lucide-map-pin"
										class="size-4 shrink-0 text-primary/80"
									/>
									<span class="min-w-0 break-words">{{ item.location }}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</Motion>
		</UPageList>
	</UPageSection>
</template>
