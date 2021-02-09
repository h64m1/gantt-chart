import { remote } from 'electron'

const dialog = remote.dialog

/**
 * ファイルを保存
 * @param {string} fileName ファイル名
 */
export function saveFile(fileName: string): void {
	console.debug('saveFile', fileName)

	dialog
		.showSaveDialog({
			filters: [
				{
					name: 'Json',
					extensions: ['json'],
				},
			],
		})
		.then((result) => {
			console.debug('exportJson: save json ...')
			console.debug(result.canceled)
			console.debug(result.filePath)
		})
		.catch((error) => {
			console.debug(error)
		})
}
