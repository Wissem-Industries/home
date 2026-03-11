import { computed, toValue, type MaybeRefOrGetter } from 'vue'

type JsonLdSchema = Record<string, unknown>

export function useJsonLd(
	input: MaybeRefOrGetter<JsonLdSchema | JsonLdSchema[] | undefined>,
	keyPrefix = 'schema'
) {
	const route = useRoute()
	const resolvedSchemas = computed(() => {
		const value = toValue(input)
		if (!value) return []
		return Array.isArray(value) ? value : [value]
	})

	useHead({
		script: () => resolvedSchemas.value.map((schema, index) => ({
			key: `${keyPrefix}-${route.path || '/'}-${index}`,
			type: 'application/ld+json',
			textContent: JSON.stringify(schema)
		}))
	})
}
