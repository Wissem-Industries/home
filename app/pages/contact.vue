<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { createEmptyContactForm, hasContactFormErrors, type ContactFormData } from '#shared/utils/contact'

const content = useSiteContent()
const page = computed(() => content.value.pages.contact)
const { allLinks, contact } = useContactLinks()
const { inViewOptions, revealInitial, revealTransition, revealVisible } = useMotionPresets()

usePageSeo(computed(() => ({
	title: page.value.seo?.title || page.value.title,
	description: page.value.seo?.description || page.value.description
})))

const toast = useToast()
const loading = ref(false)
const state = reactive<ContactFormData>(createEmptyContactForm())
const isFormInvalid = computed(() => hasContactFormErrors(state))

const baseCardUi = {
	root: 'rounded-2xl',
	header: 'p-5 sm:p-6 pb-4'
}

const sidebarCardUi = {
	...baseCardUi,
	body: 'px-5 sm:px-6 pb-5 sm:pb-6 pt-0'
}

const formCardUi = {
	...baseCardUi,
	root: `${baseCardUi.root} flex h-full flex-col`,
	header: 'min-h-[116px] p-5 sm:p-6 pb-4',
	body: 'px-5 sm:px-6 pb-5 sm:pb-6 pt-0 flex-1'
}

async function onSubmit(event: FormSubmitEvent<ContactFormData>) {
	if (isFormInvalid.value) return

	try {
		loading.value = true

		await $fetch('/api/contact', {
			method: 'POST',
			body: event.data
		})

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
				description: '!mx-0 text-left max-w-2xl',
				container: 'pb-8 sm:pb-10'
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
				<div class="mx-auto w-full max-w-5xl">
					<div class="grid grid-cols-1 gap-5 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start lg:gap-6">
						<UCard
							:ui="sidebarCardUi"
						>
							<template #header>
								<div class="space-y-2">
									<h2 class="text-base font-medium text-highlighted">
										{{ page.sidebar.title }}
									</h2>

									<p class="text-sm leading-6 text-muted">
										{{ page.sidebar.description }}
									</p>
								</div>
							</template>

							<ContactDetailsList
								:location-label="contact.locationLabel"
								:location="contact.location"
								:links="allLinks"
							/>
						</UCard>

						<UCard
							class="h-full"
							:ui="formCardUi"
						>
							<template #header>
								<div class="space-y-2">
									<h2 class="text-base font-medium text-highlighted">
										{{ page.title }}
									</h2>

									<p class="text-sm leading-6 text-muted">
										{{ page.description }}
									</p>
								</div>
							</template>

							<UForm
								:state="state"
								novalidate
								class="flex h-full flex-col gap-6"
								@submit="onSubmit"
							>
								<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<UFormField
										name="name"
										:label="page.form.name.label"
										required
										:ui="{ error: 'hidden' }"
									>
										<UInput
											v-model="state.name"
											:placeholder="page.form.name.placeholder"
											autocomplete="name"
											class="w-full"
										/>
									</UFormField>

									<UFormField
										name="email"
										:label="page.form.email.label"
										required
										:ui="{ error: 'hidden' }"
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
									name="subject"
									:label="page.form.subject.label"
									required
									:ui="{ error: 'hidden' }"
								>
									<UInput
										v-model="state.subject"
										:placeholder="page.form.subject.placeholder"
										class="w-full"
									/>
								</UFormField>

								<UFormField
									name="message"
									:label="page.form.message.label"
									required
									:ui="{ error: 'hidden' }"
								>
									<UTextarea
										v-model="state.message"
										:rows="7"
										:placeholder="page.form.message.placeholder"
										class="w-full"
									/>
								</UFormField>

								<div class="mt-auto flex flex-col gap-3 border-t border-default/50 pt-5 sm:flex-row sm:items-end sm:justify-between">
									<div class="flex items-start gap-1 text-xs italic leading-6 text-muted sm:max-w-[320px]">
										<UTooltip :text="page.form.privacyHint">
											<UButton
												icon="i-lucide-info"
												color="neutral"
												variant="ghost"
												size="sm"
												class="-mt-0.5 shrink-0"
												:aria-label="page.form.privacyAriaLabel"
											/>
										</UTooltip>

										<span>{{ page.form.responseHint }}</span>
									</div>

									<UButton
										type="submit"
										color="primary"
										size="md"
										variant="subtle"
										:loading="loading"
										:disabled="loading || isFormInvalid"
										trailing-icon="i-lucide-send"
										class="w-full justify-center sm:w-auto sm:min-w-[220px]"
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
