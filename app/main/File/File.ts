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
 * ファイルを読み込み
 */
export async function loadFile(): Promise<unknown> {
	console.debug('loadFile')

	// const filePaths = dialog.showOpenDialogSync({
	// 	filters: [
	// 		{
	// 			name: 'Json',
	// 			extensions: ['json'],
	// 		},
	// 	],
	// })

	// if (filePaths === undefined) {
	// 	console.debug('cant open file')
	// 	return []
	// }

	// console.debug('importJson: load json ...', filePaths)

	// const data: Array<unknown> = filePaths.map((path) => {
	// 	readFile(path)
	// })
	// return data

	const { canceled, filePaths } = await dialog.showOpenDialog({
		filters: [
			{
				name: 'Json',
				extensions: ['json'],
			},
		],
	})

	if (canceled) {
		return { canceled, data: [] }
	}

	console.debug('importJson: load json ...', filePaths)
	const data = filePaths.map((path) => {
		return readFile(path)
	})
	return { canceled, data }
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

/**
 * ローカルからファイル読み出し
 * @param {string} fileName 出力ファイル名
 */
function readFile(fileName: string): Array<unknown> {
	console.debug('readFile', fileName)
	// fs.readFile(fileName, { encoding: 'utf8' }, (error, data) => {
	// 	if (error) throw error
	// 	const json = JSON.parse(data)
	// 	console.debug(`File ${fileName} loaded: data`, json)
	// 	const keys = Object.keys(json)
	// 	keys.forEach((key) => {
	// 		console.debug('key', key, ' index:', json[key].key, 'data:', json[key].value)
	// 		output.push({
	// 			key: json[key].key,
	// 			value: json[key].value,
	// 		})
	// 	})
	// })

	const data = fs.readFileSync(fileName, { encoding: 'utf8' })
	if (data === undefined) {
		console.debug('data is undefined')
		return [undefined]
	}

	const json = JSON.parse(data)
	console.debug(`File ${fileName} loaded: data`, data)
	const keys = Object.keys(json)

	return keys.map((key) => {
		// console.debug('key', key, ' index:', json[key].key, 'data:', json[key].value)
		return {
			key: json[key].key,
			value: json[key].value,
		}
	})
}
