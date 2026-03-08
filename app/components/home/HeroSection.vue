<script setup lang="ts">
import { getLinkTarget, isExternalLink } from '#shared/utils/links'

type ContactLink = {
	id: string
	label: string
	value: string
	to: string
	icon: string
}

const { profile } = useAppConfig()
const { downloadFile } = useFileDownload()
const { heroInitial, heroTransition, heroVisible } = useMotionPresets()

const props = defineProps<{
	name: string
	status: string
	objective: string
	description: string
	avatarAlt: string
	resumeLabel: string
	resumeHref: string
	resumeFilename: string
	resumeMessage: string
	secondaryCtaLabel: string
	secondaryCtaTo: string
	links: ContactLink[]
}>()

function onDownloadResume() {
	downloadFile(props.resumeHref, props.resumeFilename, props.resumeMessage)
}
</script>

<template>
	<UPageHero
		:ui="{
			headline: 'flex items-center justify-center',
			title: 'text-shadow-md max-w-lg mx-auto',
			links: 'mt-6 flex-col items-center gap-4'
		}"
	>
		<template #headline>
			<Motion
				:initial="heroInitial"
				:animate="heroVisible"
				:transition="heroTransition(0.05)"
			>
				<picture>
					<source
						media="(prefers-color-scheme: dark)"
						:srcset="profile.picture.dark"
					>
					<img
						class="size-24 object-cover"
						:src="profile.picture.light"
						:alt="avatarAlt"
						width="96"
						height="96"
						loading="eager"
						fetchpriority="high"
						decoding="async"
					>
				</picture>
			</Motion>
		</template>

		<template #title>
			<Motion
				:initial="heroInitial"
				:animate="heroVisible"
				:transition="heroTransition(0.1)"
			>
				{{ name }}
			</Motion>
		</template>

		<template #description>
			<Motion
				:initial="heroInitial"
				:animate="heroVisible"
				:transition="heroTransition(0.16)"
			>
				<div class="mx-auto max-w-2xl space-y-2">
					<p class="text-sm font-medium text-highlighted sm:text-base">
						{{ status }}
					</p>

					<p class="text-sm text-toned sm:text-base">
						{{ objective }}
					</p>

					<p class="text-sm text-muted sm:text-base">
						{{ description }}
					</p>
				</div>
			</Motion>
		</template>

		<template #links>
			<Motion
				:initial="heroInitial"
				:animate="heroVisible"
				:transition="heroTransition(0.24)"
			>
				<div class="flex items-center gap-2">
					<UButton
						class="cursor-pointer"
						:label="resumeLabel"
						color="neutral"
						icon="i-carbon-download"
						variant="subtle"
						@click="onDownloadResume"
					/>

					<UButton
						:color="'success'"
						variant="ghost"
						class="gap-2"
						:to="secondaryCtaTo"
						:label="secondaryCtaLabel"
					>
						<template #leading>
							<span class="relative flex size-2">
								<span
									class="absolute inline-flex size-full rounded-full opacity-75"
									:class="'bg-success animate-ping'"
								/>
								<span
									class="relative inline-flex size-2 scale-90 rounded-full"
									:class="'bg-success'"
								/>
							</span>
						</template>
					</UButton>
				</div>
			</Motion>

			<div class="mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
				<Motion
					v-for="(link, index) of links"
					:key="link.id"
					:initial="heroInitial"
					:animate="heroVisible"
					:transition="heroTransition(0.3 + index * 0.06)"
				>
					<UButton
						size="xl"
						color="neutral"
						variant="ghost"
						:icon="link.icon"
						:to="link.to"
						:external="isExternalLink(link.to)"
						:target="getLinkTarget(link.to)"
						:aria-label="link.label"
					/>
				</Motion>
			</div>
		</template>
	</UPageHero>
</template>
