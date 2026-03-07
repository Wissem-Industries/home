export async function useCvContent() {
	return useAsyncData('cv-content', () => queryCollection('cv').first())
}
