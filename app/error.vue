<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
	error: {
		type: Object as PropType<NuxtError>,
		required: true
	}
})

const content = useSiteContent()
const errorContent = computed(() => content.value.ui.error)

useHead({
	htmlAttrs: {
		lang: 'fr'
	}
})

usePageSeo(computed(() => ({
	title: errorContent.value.title,
	description: errorContent.value.description
})))
</script>

<template>
	<div>
		<AppHeader />

		<UMain>
			<UContainer>
				<UPage>
					<UError :error="error" />
				</UPage>
			</UContainer>
		</UMain>

		<AppFooter />
		<UToaster />
	</div>
</template>
