/**
 * 行番号配列を保存
 * @param id ID
 * @param row 行番号
 */
export function saveRow(id: string, row: Array<string>): void {
	localStorage.setItem(id, JSON.stringify(row))
}

/**
 * 行番号配列を保存
 * @param id ID
 */
export function subscribeRow(id: string): Array<string> {
	const item = localStorage.getItem(id)
	if (item === null) {
		return []
	}

	return JSON.parse(item)
}

/**
 * 行番号配列を取得
 * @param id ID
 * @param row 行番号
 */
export function unsubscribeRow(id: string): void {
	localStorage.removeItem(id)
}
