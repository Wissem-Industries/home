export function useFileDownload() {
	const toast = useToast()

	function downloadFile(data: Blob | string, filename: string, message: string) {
		if (!import.meta.client) return
		const link = document.createElement('a')
		let objectUrl: string | null = null

		if (typeof data === 'string') link.href = data
		else {
			objectUrl = URL.createObjectURL(data)
			link.href = objectUrl
		}

		link.download = filename
		link.rel = 'noopener'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)

		if (objectUrl) setTimeout(() => URL.revokeObjectURL(objectUrl as string), 2000)
		toast.add({ title: message, color: 'success', icon: 'i-lucide-download' })
	}

	return { downloadFile}
}
