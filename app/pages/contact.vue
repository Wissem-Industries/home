<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { data: page } = await useAsyncData('contact-page', () => {
	return queryCollection('pages').path('/contact').first()
})

if (!page.value) {
	throw createError({
		statusCode: 404,
		statusMessage: 'Page not found',
		fatal: true
	})
}

useSeoMeta({
	title: page.value?.seo?.title || page.value?.title,
	ogTitle: page.value?.seo?.title || page.value?.title,
	description: page.value?.seo?.description || page.value?.description,
	ogDescription: page.value?.seo?.description || page.value?.description
})

const schema = z.object({
	name: z.string().min(2, 'Le nom est trop court'),
	email: z.email('L\'email n\'est pas valide'),
	subject: z.string().min(3, 'Le sujet est trop court'),
	message: z.string().min(10, 'Le message est trop court')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
	name: '',
	email: '',
	subject: '',
	message: ''
})

const toast = useToast()
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
	try {
		loading.value = true
		await $fetch('/api/contact', { method: 'POST', body: event.data })

		toast.add({
			title: 'Message envoyé avec succès !',
			description: 'Merci pour votre message, je reviendrai vers vous dès que possible.',
			color: 'success'
		})

		state.name = ''
		state.email = ''
		state.subject = ''
		state.message = ''
	} catch {
		toast.add({
			title: 'Erreur inconnnue',
			description: 'Une erreur est survenue lors de l\'envoi du message. Merci de réessayer plus tard.',
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
						<!-- Carte infos -->
						<UCard
							class="lg:col-span-1"
							:ui="{ root: 'h-full', body: 'p-6 sm:p-7 space-y-6' }"
						>
							<div class="space-y-2">
								<p class="text-xs uppercase tracking-wide text-muted">
									Informations & Liens
								</p>

								<p class="text-sm text-muted">
									Vous pouvez me contacter pour un stage, un projet ou toute autre opportunité liée à mon profil.
								</p>
							</div>

							<div class="space-y-6 text-sm">
								<div class="flex items-center gap-3">
									<div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
										<UIcon
											name="i-lucide-mail"
											class="size-4 text-primary"
										/>
									</div>
									<div class="flex flex-col">
										<span class="text-xs uppercase tracking-wide text-muted">Email</span>
										<span class="font-medium">contact@wissem.pro</span>
									</div>
								</div>

								<div class="flex items-center gap-3">
									<div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
										<UIcon
											name="i-lucide-map-pin"
											class="size-4 text-primary"
										/>
									</div>
									<div class="flex flex-col">
										<span class="text-xs uppercase tracking-wide text-muted">Localisation</span>
										<span class="font-medium">Île-de-France · Lille</span>
									</div>
								</div>

								<div class="flex items-center gap-3">
									<div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
										<UIcon
											name="i-simple-icons-linkedin"
											class="size-4 text-primary"
										/>
									</div>
									<div class="flex flex-col">
										<span class="text-xs uppercase tracking-wide text-muted">LinkedIn</span>
										<ULink
											to="https://www.linkedin.com/in/wissem-badraoui"
											class="text-sm text-primary hover:underline"
										>
											Voir mon profil
										</ULink>
									</div>
								</div>

								<div class="flex items-center gap-3">
									<div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
										<UIcon
											name="i-simple-icons-github"
											class="size-4 text-primary"
										/>
									</div>
									<div class="flex flex-col">
										<span class="text-xs uppercase tracking-wide text-muted">GitHub</span>
										<ULink
											to="https://github.com/WissemBad"
											class="text-sm text-primary hover:underline"
										>
											github.com/WissemBad
										</ULink>
									</div>
								</div>
							</div>
						</UCard>

						<!-- Carte formulaire -->
						<UCard
							class="lg:col-span-2"
							:ui="{ root: 'h-full' }"
						>
							<UForm
								:schema="schema"
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
