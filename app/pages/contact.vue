<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import { createEmptyContactForm, getContactFormErrors, type ContactFormData } from '../../utils/contact'

type ContactItem = {
	icon: string
	label: string
	value: string
	to?: string
	target?: string
}
const content = useSiteContent()
const page = computed(() => content.value.pages.contact)
const cv = computed(() => content.value.cv)

useSeoMeta({
	title: page.value.seo?.title || page.value.title,
	ogTitle: page.value.seo?.title || page.value.title,
	description: page.value.seo?.description || page.value.description,
	ogDescription: page.value.seo?.description || page.value.description
})

const state = reactive<ContactFormData>(createEmptyContactForm())
const toast = useToast()
const loading = ref(false)

const contactItems = computed<ContactItem[]>(() => {
	const locationItem: ContactItem = {
		icon: 'i-lucide-map-pin',
		label: 'Localisation',
		value: cv.value.contact.location
	}

	const publicLinks = cv.value.contact.links.map(link => ({
		icon: link.icon,
		label: link.label,
		value: link.value,
		to: link.to,
		target: link.to.startsWith('http') ? '_blank' : undefined
	}))

	return [locationItem, ...publicLinks]
})

function validateContactForm(value: Partial<ContactFormData>): FormError[] {
	return getContactFormErrors(value).map(error => ({
		name: error.name,
		message: error.message
	}))
}

async function onSubmit(event: FormSubmitEvent<ContactFormData>) {
	try {
		loading.value = true
		await $fetch('/api/contact', { method: 'POST', body: event.data })

		toast.add({
			title: 'Message envoyé avec succès !',
			description: 'Merci pour votre message, je reviendrai vers vous dès que possible.',
			color: 'success'
		})

		Object.assign(state, createEmptyContactForm())
	} catch {
		toast.add({
			title: 'Erreur inconnue',
			description: 'Une erreur est survenue lors de l\'envoi du message. Merci de réessayer plus tard.',
			color: 'error'
		})
	} finally {
		loading.value = false
	}
}
</script>

<template>
	<UPage v-if="page && cv">
		<UPageHero
			:title="page.title"
			:description="page.description"
			:ui="{
				title: '!mx-0 text-left',
				description: '!mx-0 text-left',
				container: '!pb-10'
			}"
		/>

		<UPageSection :ui="{ container: '!py-0 !mb-0' }">
			<Motion
				:key="page.title"
				:initial="{ opacity: 0, transform: 'translateY(10px)' }"
				:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
				:transition="{ delay: 0.15 }"
				:in-view-options="{ once: true }"
			>
				<div class="max-w-5xl mx-auto space-y-8">
					<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
						<UCard
							class="lg:col-span-1"
							:ui="{ root: 'h-full', body: 'p-6 sm:p-7 space-y-6' }"
						>
							<div class="space-y-2">
								<p class="text-xs uppercase tracking-wide text-muted">
									{{ cv.contact.title }}
								</p>

								<p class="text-sm text-muted">
									{{ cv.contact.description }}
								</p>
							</div>

							<div class="space-y-6 text-sm">
								<div
									v-for="item in contactItems"
									:key="`${item.label}-${item.value}`"
									class="flex items-center gap-3"
								>
									<div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
										<UIcon
											:name="item.icon"
											class="size-4 text-primary"
										/>
									</div>
									<div class="flex flex-col">
										<span class="text-xs uppercase tracking-wide text-muted">{{ item.label }}</span>
										<ULink
											v-if="item.to"
											:to="item.to"
											:target="item.target"
											class="text-sm text-primary hover:underline"
										>
											{{ item.value }}
										</ULink>
										<span
											v-else
											class="font-medium"
										>
											{{ item.value }}
										</span>
									</div>
								</div>
							</div>
						</UCard>

						<UCard
							class="lg:col-span-2"
							:ui="{ root: 'h-full' }"
						>
							<UForm
								:validate="validateContactForm"
								:state="state"
								class="space-y-4 w-full"
								@submit="onSubmit"
							>
								<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
									<UFormField
										label="Nom"
										name="name"
										required
									>
										<UInput
											v-model="state.name"
											placeholder="Votre nom"
											class="w-full"
										/>
									</UFormField>

									<UFormField
										label="Email"
										name="email"
										required
									>
										<UInput
											v-model="state.email"
											type="email"
											placeholder="vous@example.com"
											class="w-full"
										/>
									</UFormField>
								</div>

								<UFormField
									label="Sujet"
									name="subject"
									required
								>
									<UInput
										v-model="state.subject"
										placeholder="Sujet du message"
										class="w-full"
									/>
								</UFormField>

								<UFormField
									label="Message"
									name="message"
									required
								>
									<UTextarea
										v-model="state.message"
										:rows="6"
										placeholder="Votre message"
										class="w-full"
									/>
								</UFormField>

								<div class="flex justify-end pt-2">
									<UButton
										type="submit"
										color="primary"
										size="md"
										variant="subtle"
										:loading="loading"
										trailing-icon="i-lucide-send"
										class="min-w-[210px] justify-center"
									>
										Envoyer le message
									</UButton>
								</div>
							</UForm>
						</UCard>
					</div>
				</div>
			</Motion>
		</UPageSection>
	</UPage>
</template>
