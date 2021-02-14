import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('api', {
	// ipcRendererの確認用: 引数を渡すだけ
	send: (message: string) => ipcRenderer.invoke('send', message),
	// DBのレコード全体をエクスポート
	export: (response: Array<unknown>) => ipcRenderer.invoke('export', response),
	// ローカルファイルをimport
	import: async (): Promise<unknown> => {
		const data = await ipcRenderer.invoke('import')
		console.debug('contextBridge::import', data)
		return data
	},
})
