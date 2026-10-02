import { serveResume } from '../../utils/resume'

export default defineEventHandler((event) => serveResume(event, 'en', 'pdf'))
