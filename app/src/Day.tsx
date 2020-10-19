const DEFAULT_FORMAT = 'YYYY-MM-DD'

type DayProps = Partial<{
	format: string // Date用のフォーマット
}>

/**
 * 日付を指定されたフォーマットで取得
 * @param {DayProps} props プロパティ
 * @return {Date} 日付
 */
function Day(props?: DayProps): Date {
	// propsが空の場合、default formatを設定
	const format = getFormat(props)
	return getDate(format)
}

/**
 * 日付用のフォーマット取得
 * @param {DayProps} props プロパティ
 * @return {string} フォーマット
 */
function getFormat(props?: DayProps): string {
	if (props === undefined || props === null) {
		return DEFAULT_FORMAT
	}

	return props.format || DEFAULT_FORMAT
}

/**
 * 日付を取得
 * @param {DayProps} format 日付用フォーマット
 * @returns {Date} 日付
 */
function getDate(format: string): Date {
	const date = new Date()
	switch (format) {
		case DEFAULT_FORMAT:
			break
		default:
			break
	}

	return date
}

export default Day
