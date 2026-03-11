<script setup lang="ts">
import type { ContactLinkContent } from '~~/shared/content'
import { getLinkTarget, isExternalLink } from '#shared/utils/links'

defineProps<{
	locationLabel: string
	location: string
	links: Array<Pick<ContactLinkContent, 'id' | 'icon' | 'label' | 'value' | 'to'>>
}>()
</script>

<template>
	<div class="space-y-3 pt-1 sm:pt-2">
		<div class="flex items-start gap-3 rounded-xl border border-default/50 p-3">
			<div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
				<UIcon
					name="i-lucide-map-pin"
					class="size-4 text-primary"
				/>
			</div>

			<div class="min-w-0 flex-1">
				<p class="text-[11px] uppercase tracking-[0.18em] text-muted">
					{{ locationLabel }}
				</p>

				<p class="mt-1 text-sm font-medium leading-6 text-default">
					{{ location }}
				</p>
			</div>
		</div>

		<div
			v-for="link in links"
			:key="link.id"
			class="flex items-start gap-3 rounded-xl border border-default/50 p-3"
		>
			<div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
				<UIcon
					:name="link.icon"
					class="size-4 text-primary"
				/>
			</div>

			<div class="min-w-0 flex-1">
				<p class="text-[11px] uppercase tracking-[0.18em] text-muted">
					{{ link.label }}
				</p>

				<ULink
					v-if="link.to"
					:to="link.to"
					:external="isExternalLink(link.to)"
					:target="getLinkTarget(link.to)"
					class="mt-1 block break-all text-sm font-medium leading-6 text-primary hover:underline"
					:title="link.value"
				>
					{{ link.value }}
				</ULink>

				<p
					v-else
					class="mt-1 break-words text-sm font-medium leading-6 text-default"
				>
					{{ link.value }}
				</p>
			</div>
		</div>
	</div>
</template>
