declare global {
	interface Window {
		api: Api
	}
}

export interface Api {
	send: (message: string) => void
	export: (response: unknown) => void
	import: () => Promise<unknown>
}
