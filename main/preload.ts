import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('api', {
	// ipcRendererの確認用: 引数を渡すだけ
	send: (message: string) => ipcRenderer.invoke('send', message),
	// DBのレコード全体をエクスポート
	export: (response: unknown) => ipcRenderer.invoke('export', response),
	// ローカルファイルをimport
	import: async (): Promise<unknown> => {
		return await ipcRenderer.invoke('import')
	},
})
