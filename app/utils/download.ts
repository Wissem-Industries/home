export function downloadFile(data: Blob | string, filename: string, message = 'Le téléchargement a démarré...') {
	const toast = useToast()
	const link = document.createElement('a')

	if (typeof data === 'string') {
		link.href = data
	} else {
		const url = URL.createObjectURL(data)
		link.href = url
		setTimeout(() => URL.revokeObjectURL(url), 2000)
	}

	link.download = filename
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)

	toast.add({ title: message, color: 'success', icon: 'i-lucide-download' })
}
