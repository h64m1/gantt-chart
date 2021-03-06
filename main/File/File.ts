import { dialog } from 'electron'
import * as fs from 'fs'

/**
 * ファイルを保存
 * @param {Array<unknown>} response DBの全レコード
 */
export function saveFile(response: unknown): void {
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
			if (result.canceled) {
				console.debug('file save canceled', result)
				return
			}

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
	const result = data.length > 0 ? data[0] : {}
	return result
}

/**
 * ローカルにファイル書き出し
 * @param {string} fileName 出力ファイル名
 * @param {Array<unknown>} data データ
 */
function writeFile(fileName: string, data: unknown) {
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
function readFile(fileName: string): unknown {
	console.debug('readFile', fileName)

	const data = fs.readFileSync(fileName, { encoding: 'utf8' })
	if (data === undefined) {
		console.debug('data is undefined')
		return [undefined]
	}

	const json = JSON.parse(data)
	console.debug(`File ${fileName} loaded: data`, data)

	return json
}
