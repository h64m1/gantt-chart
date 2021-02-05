import { Menu } from 'electron'

const isMac = process.platform === 'darwin'

/**
 * メニュー作成
 * @param appName アプリケーション名
 */
export function createMenu(appName: string): Menu {
	// create menu
	const template: Electron.MenuItemConstructorOptions[] = []
	template.push(createAppMenu(appName))
	template.push(createFileMenu())
	template.push(createEditMenu())

	console.debug('Create menu ...')
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
	return {
		label: 'File',
		submenu: [
			isMac ? { role: 'close' } : { role: 'quit' },
			// {
			// 	label: 'export',
			// 	click: () => {
			// 		console.debug('export ....')
			// 	},
			// },
		],
	}
}

/**
 * 編集メニュー
 */
function createEditMenu(): Electron.MenuItemConstructorOptions {
	// { role: 'editMenu' }
	return isMac
		? {
				label: 'Edit',
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
				label: 'Edit',
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
