declare global {
	interface Window {
		api: Api
	}
}

export interface Api {
	send: (message: string) => void
	export: (response: Array<unknown>) => void
	import: () => Promise<unknown>
}
