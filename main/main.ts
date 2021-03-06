import { app, BrowserWindow, ipcMain } from 'electron'
import * as File from './File/File'
import * as menu from './menu'
import * as path from 'path'

function createWindow() {
	// Create the browser window.
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	})
	win.setMenu(menu.createMenu(app))

	console.debug('ipcMain add "send" handler ...')
	ipcMain.handle('send', (event, message: string) => {
		console.debug('send success : ', message)
	})
	ipcMain.handle('export', (event, response: unknown) => {
		File.saveFile(response)
	})
	ipcMain.handle(
		'import',
		async (): Promise<unknown> => {
			return await File.loadFile()
		},
	)

	// and load the index.html of the app.
	win.loadURL('http://localhost:3000')

	win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
