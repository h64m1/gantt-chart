import { App, Menu } from 'electron'

const isMac = process.platform === 'darwin'

/**
 * メニュー作成
 * @param appName アプリケーション名
 */
export function createMenu(app: App): Menu {
	// create menu
	const template: Electron.MenuItemConstructorOptions[] = []
	template.push(createAppMenu(app.name))
	template.push(createFileMenu())
	template.push(createEditMenu())
	template.push(createViewMenu())
	template.push(createWindowMenu())

	console.debug('Create menu ...', process.platform, app.getLocale())
	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)

	return menu
}

/**
 * アプリメニュー
 * @param appName アプリ名
 */
function createAppMenu(appName: string): Electron.MenuItemConstructorOptions {
	// { role: 'appMenu' }
	console.debug('createAppMenu', process.platform)
	return isMac
		? {
				label: appName,
				submenu: [
					{ role: 'about' },
					{ type: 'separator' },
					{ role: 'services' },
					{ type: 'separator' },
					{ role: 'hide' },
					{ role: 'hideOthers' },
					{ role: 'unhide' },
					{ type: 'separator' },
					{ role: 'quit' },
				],
		  }
		: {}
}

function createFileMenu(): Electron.MenuItemConstructorOptions {
	// { role: 'fileMenu' }
	console.debug('createFileMenu', process.platform)
	const label = 'File'
	return isMac
		? {
				label: label,
				submenu: [
					{ role: 'close' },
					{
						label: 'export',
						click: () => {
							console.debug('export ....')
						},
					},
				],
		  }
		: {
				label: label,
				submenu: [{ role: 'quit' }],
		  }
}

/**
 * 編集メニュー
 */
function createEditMenu(): Electron.MenuItemConstructorOptions {
	// { role: 'editMenu' }
	console.debug('createEditMenu', process.platform)
	const label = 'Edit'
	return isMac
		? {
				label: label,
				submenu: [
					{ role: 'undo' },
					{ role: 'redo' },
					{ type: 'separator' },
					{ role: 'cut' },
					{ role: 'copy' },
					{ role: 'paste' },
					{ role: 'pasteAndMatchStyle' },
					{ role: 'delete' },
					{ role: 'selectAll' },
					{ type: 'separator' },
					{
						label: 'Speech',
						submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }],
					},
				],
		  }
		: {
				label: label,
				submenu: [
					{ role: 'undo' },
					{ role: 'redo' },
					{ type: 'separator' },
					{ role: 'cut' },
					{ role: 'copy' },
					{ role: 'paste' },
					{ role: 'delete' },
					{ type: 'separator' },
					{ role: 'selectAll' },
				],
		  }
}

/**
 * 表示メニュー
 */
function createViewMenu(): Electron.MenuItemConstructorOptions {
	// { role: 'viewMenu' }
	console.debug('createViewMenu', process.platform)
	return {
		label: 'View',
		submenu: [
			{ role: 'reload' },
			{ role: 'forceReload' },
			{ role: 'toggleDevTools' },
			{ type: 'separator' },
			{ role: 'resetZoom' },
			{ role: 'zoomIn' },
			{ role: 'zoomOut' },
			{ type: 'separator' },
			{ role: 'togglefullscreen' },
		],
	}
}

/**
 * ウィンドウメニュー
 */
function createWindowMenu(): Electron.MenuItemConstructorOptions {
	// { role: 'windowMenu' }
	console.debug('createWindowMenu', process.platform)
	const label = 'Window'
	return isMac
		? {
				label: label,
				submenu: [
					{ role: 'minimize' },
					{ role: 'zoom' },
					{ type: 'separator' },
					{ role: 'front' },
					{ type: 'separator' },
					{ role: 'window' },
				],
		  }
		: {
				label: label,
				submenu: [{ role: 'minimize' }, { role: 'zoom' }, { role: 'close' }],
		  }
}
