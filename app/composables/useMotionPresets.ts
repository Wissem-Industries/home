import { usePreferredReducedMotion } from '@vueuse/core'
import { computed } from 'vue'

const revealVisibleState = { opacity: 1, transform: 'translateY(0)' }
const heroVisibleState = { opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' }

export function useMotionPresets() {
	const preferredReducedMotion = usePreferredReducedMotion()
	const reduceMotion = computed(() => preferredReducedMotion.value === 'reduce')

	const revealInitial = computed(() => (
		reduceMotion.value
			? revealVisibleState
			: { opacity: 0, transform: 'translateY(16px)' }
	))

	const heroInitial = computed(() => (
		reduceMotion.value
			? heroVisibleState
			: { opacity: 0, transform: 'translateY(12px)', filter: 'blur(8px)' }
	))

	function revealTransition(index = 0, step = 0.06) {
		return reduceMotion.value
			? { duration: 0 }
			: { duration: 0.4, delay: index * step }
	}

	function heroTransition(delay = 0) {
		return reduceMotion.value
			? { duration: 0 }
			: { duration: 0.42, delay }
	}

	return {
		reduceMotion,
		revealInitial,
		revealVisible: revealVisibleState,
		heroInitial,
		heroVisible: heroVisibleState,
		inViewOptions: { once: true, amount: 0.2 },
		revealTransition,
		heroTransition
	}
}
