<script setup lang="ts">
import { downloadFile } from '~/utils/download'

type ContactLink = {
	label: string
	value: string
	to: string
	icon: string
}

const { profile } = useAppConfig()

defineProps<{
	name: string
	status: string
	objective: string
	description: string
	secondaryCtaLabel: string
	secondaryCtaTo: string
	links: ContactLink[]
}>()
</script>

<template>
	<UPageHero
		:ui="{
			headline: 'flex items-center justify-center',
			title: 'text-shadow-md max-w-lg mx-auto',
			links: 'mt-4 flex-col justify-center items-center'
		}"
	>
		<template #headline>
			<Motion
				:initial="{ scale: 1.2, opacity: 0, filter: 'blur(20px)' }"
				:animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }"
				:transition="{ duration: 0.6, delay: 0.1 }"
			>
				<picture>
					<source
						media="(prefers-color-scheme: dark)"
						:srcset="profile.picture.dark"
					>
					<img
						class="size-24 object-cover"
						:src="profile.picture.light"
						:alt="profile.picture.alt"
					>
				</picture>
			</Motion>
		</template>

		<template #title>
			<Motion
				:initial="{ scale: 1.2, opacity: 0, filter: 'blur(20px)' }"
				:animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }"
				:transition="{ duration: 0.6, delay: 0.1 }"
			>
				{{ name }}
			</Motion>
		</template>

		<template #description>
			<Motion
				:initial="{ scale: 1.2, opacity: 0, filter: 'blur(20px)' }"
				:animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }"
				:transition="{ duration: 0.6, delay: 0.3 }"
			>
				<div class="mx-auto max-w-2xl space-y-2">
					<p class="text-sm sm:text-base font-medium text-highlighted">
						{{ status }}
					</p>
					<p class="text-sm sm:text-base text-toned">
						{{ objective }}
					</p>
					<p class="text-sm sm:text-base text-muted">
						{{ description }}
					</p>
				</div>
			</Motion>
		</template>

		<template #links>
			<Motion
				:initial="{ scale: 1.2, opacity: 0, filter: 'blur(20px)' }"
				:animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }"
				:transition="{ duration: 0.6, delay: 0.5 }"
			>
				<div class="flex flex-wrap items-center justify-center gap-2">
					<UButton
						class="cursor-pointer"
						label="Télécharger le CV (PDF)"
						color="neutral"
						icon="i-carbon-download"
						variant="subtle"
						@click="downloadFile(profile.cv.href, profile.cv.filename)"
					/>

					<UButton
						:label="secondaryCtaLabel"
						color="neutral"
						variant="outline"
						trailing-icon="i-lucide-arrow-right"
						:to="secondaryCtaTo"
					/>
				</div>
			</Motion>

			<div class="gap-x-4 inline-flex mt-4">
				<Motion
					v-for="(link, index) of links"
					:key="link.to"
					:initial="{ scale: 1.2, opacity: 0, filter: 'blur(20px)' }"
					:animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }"
					:transition="{ duration: 0.6, delay: 0.5 + index * 0.1 }"
				>
					<UButton
						size="xl"
						color="neutral"
						variant="ghost"
						:icon="link.icon"
						:to="link.to"
						:target="link.to.startsWith('http') ? '_blank' : undefined"
						:aria-label="link.label"
					/>
				</Motion>
			</div>
		</template>
	</UPageHero>
</template>
