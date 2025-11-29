<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const { footer, global } = useAppConfig()

defineProps<{
	page: IndexCollectionItem
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
						:srcset="global.picture?.dark"
					>
					<img
						class="size-24 object-cover"
						:src="global.picture?.light"
						:alt="global.picture?.alt"
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
				{{ page.title }}
			</Motion>
		</template>

		<template #description>
			<Motion
				:initial="{ scale: 1.2, opacity: 0, filter: 'blur(20px)' }"
				:animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }"
				:transition="{ duration: 0.6, delay: 0.3 }"
			>
				{{ page.description }}
			</Motion>
		</template>

		<template #links>
			<Motion
				:initial="{ scale: 1.2, opacity: 0, filter: 'blur(20px)' }"
				:animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }"
				:transition="{ duration: 0.6, delay: 0.5 }"
			>
				<div
					v-if="page.hero.links"
					class="flex items-center gap-2"
				>
					<UButton
						v-bind="page.hero.links[0]"
						:variant="page.hero.links[0]?.variant || 'solid'"
					/>
					<UButton
						:color="global.status ? 'success' : 'error'"
						variant="ghost"
						class="gap-2"
						:label="global.status ? 'Ouvert aux opportunités' : 'Indisponible pour le moment'"
					>
						<template #leading>
							<span class="relative flex size-2">
								<span
									class="absolute inline-flex size-full rounded-full opacity-75"
									:class="global.status ? 'bg-success animate-ping' : 'bg-error'"
								/>
								<span
									class="relative inline-flex size-2 scale-90 rounded-full"
									:class="global.status ? 'bg-success' : 'bg-error'"
								/>
							</span>
						</template>
					</UButton>
				</div>
			</Motion>

			<div class="gap-x-4 inline-flex mt-4">
				<Motion
					v-for="(link, index) of footer?.links"
					:key="index"

					:initial="{ scale: 1.2, opacity: 0, filter: 'blur(20px)' }"
					:animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }"
					:transition="{ duration: 0.6, delay: 0.5 + index * 0.1 }"
				>
					<UButton v-bind="{ size: 'xl', color: 'neutral', variant: 'ghost', ...link }" />
				</Motion>
			</div>
		</template>

		<!-- Unused
    <UMarquee
      class="py-2 -mx-8 sm:-mx-12 lg:-mx-16 [--duration:40s]"
    >
      <Motion
        v-for="(img, index) in page.hero.images"
        :key="index"
        :initial="{
          scale: 1.2,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: index * 0.1
        }"
      >
        <NuxtImg
          width="234"
          height="234"
          class="rounded-lg aspect-square object-cover"
          :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'"
          v-bind="img"
        />
      </Motion>
    </UMarquee>
    -->
	</UPageHero>
</template>
