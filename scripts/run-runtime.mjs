import { spawn } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'
import { resolve, join } from 'node:path'

const [, , target, ...args] = process.argv

if (!target) {
	console.error('Missing target. Use "nuxi" or "server".')
	process.exit(1)
}

function getPreferredRuntime() {
	const candidates = []

	if (process.platform === 'win32' && process.env.LOCALAPPDATA) {
		candidates.push(join(process.env.LOCALAPPDATA, 'Microsoft', 'WinGet', 'Links', 'bun.exe'))
	}

	candidates.push(process.execPath)

	return candidates.find(candidate => candidate && existsSync(candidate)) || process.execPath
}

function getEntryPoint() {
	if (target === 'server') {
		return resolve(process.cwd(), '.output/server/index.mjs')
	}

	if (target === 'nuxi') {
		return resolve(process.cwd(), 'node_modules/@nuxt/cli/bin/nuxi.mjs')
	}

	console.error(`Unsupported target "${target}".`)
	process.exit(1)
}

const runtime = getPreferredRuntime()
const entryPoint = getEntryPoint()
const runtimeArgs = target === 'server'
	? [entryPoint, ...args]
	: [entryPoint, ...args]
const env = { ...process.env }
const isBuildCommand = target === 'nuxi' && args.includes('build')

function cleanBuildArtifacts() {
	const buildArtifacts = [
		resolve(process.cwd(), '.nuxt'),
		resolve(process.cwd(), '.output'),
		resolve(process.cwd(), 'node_modules/.cache/nuxt/.nuxt')
	]

	for (const artifactPath of buildArtifacts) {
		rmSync(artifactPath, { recursive: true, force: true })
	}
}

if (isBuildCommand) {
	cleanBuildArtifacts()
	env.BASELINE_BROWSER_MAPPING_IGNORE_OLD_DATA ??= 'true'
	env.BROWSERSLIST_IGNORE_OLD_DATA ??= 'true'
	env.NODE_NO_WARNINGS ??= '1'
}

const child = spawn(runtime, runtimeArgs, {
	stdio: ['inherit', 'pipe', 'pipe'],
	env
})

function shouldFilterBuildLine(line) {
	return isBuildCommand && (
		line.includes('[baseline-browser-mapping]')
		|| line.includes('Circular dependency:')
	)
}

function pipeOutput(stream, writer) {
	let buffer = ''

	stream.on('data', (chunk) => {
		buffer += chunk.toString()
		const lines = buffer.split(/\r?\n/)
		buffer = lines.pop() || ''

		for (const line of lines) {
			if (!shouldFilterBuildLine(line)) writer.write(`${line}\n`)
		}
	})

	stream.on('end', () => {
		if (buffer && !shouldFilterBuildLine(buffer)) writer.write(buffer)
	})
}

pipeOutput(child.stdout, process.stdout)
pipeOutput(child.stderr, process.stderr)

child.on('error', (error) => {
	console.error(error)
	process.exit(1)
})

child.on('exit', (code, signal) => {
	if (signal) {
		process.kill(process.pid, signal)
		return
	}

	process.exit(code ?? 0)
})
