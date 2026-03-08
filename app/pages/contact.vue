<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import { createEmptyContactForm, getContactFormErrors, type ContactFormData } from '#shared/utils/contact'

const content = useSiteContent()
const page = computed(() => content.value.pages.contact)
const { allLinks, contact } = useContactLinks()
const { inViewOptions, revealInitial, revealTransition, revealVisible } = useMotionPresets()

usePageSeo(computed(() => ({
	title: page.value.seo?.title || page.value.title,
	description: page.value.seo?.description || page.value.description
})))

const state = reactive<ContactFormData>(createEmptyContactForm())
const toast = useToast()
const loading = ref(false)

function validateContactForm(value: Partial<ContactFormData>): FormError[] {
	return getContactFormErrors(value, page.value.form.validation).map(error => ({
		name: error.name,
		message: error.message
	}))
}

async function onSubmit(event: FormSubmitEvent<ContactFormData>) {
	try {
		loading.value = true
		await $fetch('/api/contact', { method: 'POST', body: event.data })

		toast.add({
			title: page.value.form.messages.successTitle,
			description: page.value.form.messages.successDescription,
			color: 'success'
		})

		Object.assign(state, createEmptyContactForm())
	} catch {
		toast.add({
			title: page.value.form.messages.errorTitle,
			description: page.value.form.messages.errorDescription,
			color: 'error'
		})
	} finally {
		loading.value = false
	}
}
</script>

<template>
	<UPage v-if="page">
		<UPageHero
			:title="page.title"
			:description="page.description"
			:ui="{
				title: '!mx-0 text-left',
				description: '!mx-0 text-left',
				container: 'pb-10 sm:pb-12'
			}"
		/>

		<UPageSection>
			<Motion
				:key="page.title"
				:initial="revealInitial"
				:while-in-view="revealVisible"
				:transition="revealTransition()"
				:in-view-options="inViewOptions"
			>
				<div class="mx-auto max-w-5xl space-y-8">
					<div class="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
						<UCard
							class="lg:col-span-1"
							:ui="{ root: 'h-full rounded-2xl', body: 'p-5 sm:p-6 space-y-6' }"
						>
							<div class="space-y-2">
								<p class="text-xs uppercase tracking-[0.18em] text-muted">
									{{ page.sidebar.title }}
								</p>

								<p class="text-sm leading-6 text-muted">
									{{ page.sidebar.description }}
								</p>
							</div>

							<ContactDetailsList
								:location-label="contact.locationLabel"
								:location="contact.location"
								:links="allLinks"
							/>
						</UCard>

						<UCard
							class="lg:col-span-2"
							:ui="{ root: 'h-full rounded-2xl', body: 'p-5 sm:p-6' }"
						>
							<UForm
								:validate="validateContactForm"
								:state="state"
								class="w-full space-y-4"
								@submit="onSubmit"
							>
								<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
									<UFormField
										:label="page.form.name.label"
										name="name"
										required
									>
										<UInput
											v-model="state.name"
											:placeholder="page.form.name.placeholder"
											autocomplete="name"
											class="w-full"
										/>
									</UFormField>

									<UFormField
										:label="page.form.email.label"
										name="email"
										required
									>
										<UInput
											v-model="state.email"
											type="email"
											:placeholder="page.form.email.placeholder"
											autocomplete="email"
											class="w-full"
										/>
									</UFormField>
								</div>

								<UFormField
									:label="page.form.subject.label"
									name="subject"
									required
								>
									<UInput
										v-model="state.subject"
										:placeholder="page.form.subject.placeholder"
										class="w-full"
									/>
								</UFormField>

								<UFormField
									:label="page.form.message.label"
									name="message"
									required
								>
									<UTextarea
										v-model="state.message"
										:rows="6"
										:placeholder="page.form.message.placeholder"
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
										{{ page.form.submitLabel }}
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
