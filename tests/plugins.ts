import { runInRepo, $ } from '../utils'
import { RunOptions } from '../types'
import fs from 'node:fs'
import path from 'node:path'

export async function test(options: RunOptions) {
	const errors: Array<{
		repo: string
		err: Error
	}> = []

	const plugins = [
		'rspack-contrib/rsbuild-plugin-umd',
		'rspack-contrib/rsbuild-plugin-eslint',
		'rspack-contrib/rsbuild-plugin-mdx',
		'rspack-contrib/rsbuild-plugin-google-analytics',
		'rspack-contrib/rsbuild-plugin-html-minifier-terser',
		'rspack-contrib/rsbuild-plugin-open-graph',
		'rspack-contrib/rsbuild-plugin-image-compress',
		'rspack-contrib/rsbuild-plugin-css-minimizer',
		'rspack-contrib/rsbuild-plugin-typed-css-modules',
		'rspack-contrib/rsbuild-plugin-pug',
		'rspack-contrib/rsbuild-plugin-toml',
		'rspack-contrib/rsbuild-plugin-template',
		'rspack-contrib/rsbuild-plugin-styled-components',
		'rspack-contrib/rsbuild-plugin-rem',
		'rspack-contrib/rsbuild-plugin-vue2',
		'rspack-contrib/rsbuild-plugin-yaml',
		'rspack-contrib/rsbuild-plugin-vue2-jsx',
		'rspack-contrib/rsbuild-plugin-type-check',
		'rspack-contrib/rsbuild-plugin-source-build',
		'rspack-contrib/rsbuild-plugin-node-polyfill',
		'rspack-contrib/rsbuild-plugin-ejs',
		'rspack-contrib/rsbuild-plugin-check-syntax',
		'rspack-contrib/rsbuild-plugin-basic-ssl',
		'rspack-contrib/rsbuild-plugin-vue-jsx',
	]

	const { workspace } = options

	const checkTest = (repo: string) => {
		const name = repo.split('/')[1]
		const pkgPath = path.join(workspace, name, 'package.json')
		if (fs.existsSync(pkgPath)) {
			const pkgStr = fs.readFileSync(pkgPath, 'utf-8')
			const { scripts } = JSON.parse(pkgStr)

			return {
				hasTest: Boolean(scripts.test),
				playwright: Boolean(scripts.test?.includes('playwright')),
			}
		}

		return { hasTest: false }
	}

	for (const repo of plugins) {
		const { hasTest, playwright } = await checkTest(repo)

		await runInRepo({
			...options,
			repo,
			branch: 'main',
			beforeTest: async () => {
				if (playwright) {
					await $`pnpm exec playwright install --with-deps`
				}
			},
			test: hasTest ? ['build', 'test'] : ['build'],
		}).catch((err) => {
			errors.push({
				repo,
				err,
			})
		})
	}

	errors.map((err) => {
		console.error(`${err.repo} test failed:`, err.err.message)
	})

	if (errors.length) {
		console.info(
			`plugin test succeed ${plugins.length - errors.length}, failed ${
				errors.length
			} (${errors.map((e) => e.repo).join(',')})`,
		)
	} else {
		console.info('plugin test all passed!')
	}
}
