import { getPortfolioContent } from '#shared/content'

export function usePortfolioContent() {
  const { locale } = useI18n()

  return {
    content: computed(() => getPortfolioContent(locale.value)),
    locale,
  }
}
