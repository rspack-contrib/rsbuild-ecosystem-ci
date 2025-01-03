// eslint-disable-next-line n/no-unpublished-import
import type { Agent } from '@antfu/ni'
export interface EnvironmentData {
	root: string
	workspace: string
	rsbuildPath: string
	cwd: string
	env: NodeJS.ProcessEnv
}

export interface RunOptions {
	workspace: string
	root: string
	rsbuildPath: string
	rsbuildMajor: number
	verify?: boolean
	skipGit?: boolean
	release?: string
	agent?: Agent
	build?: Task | Task[]
	test?: Task | Task[]
	beforeInstall?: Task | Task[]
	afterInstall?: Task | Task[]
	beforeBuild?: Task | Task[]
	beforeTest?: Task | Task[]
	suiteBranch?: string
	suiteTag?: string
	suiteCommit?: string
}

type Task = string | (() => Promise<any>)

export interface CommandOptions {
	repo?: string
	branch?: string
	tag?: string
	commit?: string
	release?: string
	verify?: boolean
	skipGit?: boolean
	suiteBranch?: string
	suiteTag?: string
	suiteCommit?: string
}

export interface RepoOptions {
	repo: string
	dir?: string
	branch?: string
	tag?: string
	commit?: string
	shallow?: boolean
	overrides?: Overrides
	// Whether to update all dependency versions through overrides instead of only updating those within the current project devDeps and deps
	forceOverride?: boolean
}

export interface Overrides {
	[key: string]: string | boolean
}
