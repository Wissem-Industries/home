export interface ContactFormData {
	name: string
	email: string
	subject: string
	message: string
}

export interface ContactFormValidationMessages {
	nameTooShort: string
	emailInvalid: string
	subjectTooShort: string
	messageTooShort: string
}

export interface ContactFormError {
	name: keyof ContactFormData
	message: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const defaultContactFormValidationMessages: ContactFormValidationMessages = {
	nameTooShort: 'Le nom est trop court.',
	emailInvalid: 'L’adresse email n’est pas valide.',
	subjectTooShort: 'Le sujet est trop court.',
	messageTooShort: 'Le message est trop court.'
}

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

export function hasContactFormErrors(input: Partial<ContactFormData>) {
	const value = normalizeContactForm(input)

	return (
		value.name.length < 2
		|| !emailPattern.test(value.email)
		|| value.subject.length < 3
		|| value.message.length < 10
	)
}

export function getContactFormErrors(
	input: Partial<ContactFormData>,
	messages: ContactFormValidationMessages = defaultContactFormValidationMessages
): ContactFormError[] {
	const value = normalizeContactForm(input)
	const errors: ContactFormError[] = []
	if (value.name.length < 2) errors.push({ name: 'name', message: messages.nameTooShort })
	if (!emailPattern.test(value.email)) errors.push({ name: 'email', message: messages.emailInvalid })
	if (value.subject.length < 3) errors.push({ name: 'subject', message: messages.subjectTooShort })
	if (value.message.length < 10) errors.push({ name: 'message', message: messages.messageTooShort })
	return errors
}
