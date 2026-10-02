import { fetchLatestRelease } from '../utils/resume'

// Version and date of the resume currently served on /cv.pdf.
export default defineEventHandler(async () => {
  try {
    const release = await fetchLatestRelease()
    return { version: release.tag_name, publishedAt: release.published_at }
  } catch {
    return { version: null, publishedAt: null }
  }
})
