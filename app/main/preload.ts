import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('api', {
	send: () => ipcRenderer.invoke('send'),
})
