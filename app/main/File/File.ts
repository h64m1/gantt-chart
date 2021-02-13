import { dialog } from 'electron'
import * as fs from 'fs'

/**
 * ファイルを保存
 * @param {Array<unknown>} response DBの全レコード
 */
export function saveFile(response: Array<unknown>): void {
	console.debug('saveFile', response)

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
			console.debug('exportJson: save json ...', result)
			const fileName = result.filePath
			if (fileName !== undefined) {
				writeFile(fileName, response)
			}
		})
		.catch((error) => {
			console.debug(error)
		})
}

/**
 * ローカルにファイル書き出し
 * @param {string} fileName 出力ファイル名
 * @param {Array<unknown>} data データ
 */
function writeFile(fileName: string, data: Array<unknown>) {
	console.debug('writeFile')
	fs.writeFile(fileName, JSON.stringify(data), (error) => {
		if (error) throw error
		console.debug(`File ${fileName} saved`)
	})
}
