export interface ContactFormData {
	name: string
	email: string
	subject: string
	message: string
}

export interface ContactFormError {
	name: keyof ContactFormData
	message: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function trimValue(value?: string) {
	return value?.trim() || ''
}

export function createEmptyContactForm(): ContactFormData {
	return {
		name: '',
		email: '',
		subject: '',
		message: ''
	}
}

export function normalizeContactForm(input: Partial<ContactFormData>): ContactFormData {
	return {
		name: trimValue(input.name),
		email: trimValue(input.email),
		subject: trimValue(input.subject),
		message: trimValue(input.message)
	}
}

export function getContactFormErrors(input: Partial<ContactFormData>): ContactFormError[] {
	const value = normalizeContactForm(input)
	const errors: ContactFormError[] = []

	if (value.name.length < 2) {
		errors.push({ name: 'name', message: 'Le nom est trop court' })
	}

	if (!emailPattern.test(value.email)) {
		errors.push({ name: 'email', message: 'L\'email n\'est pas valide' })
	}

	if (value.subject.length < 3) {
		errors.push({ name: 'subject', message: 'Le sujet est trop court' })
	}

	if (value.message.length < 10) {
		errors.push({ name: 'message', message: 'Le message est trop court' })
	}

	return errors
}
