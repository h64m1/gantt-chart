declare global {
	interface Window {
		api: Api
	}
}

export interface Api {
	send: () => void
}
