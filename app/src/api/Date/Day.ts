import dayjs, { Dayjs, OpUnitType } from 'dayjs'

type DEFAULT_FORMAT = 'YYYY-MM-DD'
type Day = Dayjs

const _defaultFormat: DEFAULT_FORMAT = 'YYYY-MM-DD'

export function DefaultFormat(): DEFAULT_FORMAT {
	return _defaultFormat
}

/**
 * 指定された日付を含む、一ヶ月分の日付文字列を配列で取得
 * @param {string} date 日付文字列
 * @param {string} format 日付のフォーマット
 */
export function Days(date: string, format?: string): Array<string> {
	// 配列:当該月の日付分
	const daysInNumber = [...Array(dayjs(date).daysInMonth())].map((_, i) => i)
	// 月初日
	const firstDate = dayjs(date).startOf('month')
	// 日付文字列の配列
	return daysInNumber.map((_, i) => firstDate.add(i, 'day').format(getFormat(format)))
}

/**
 * 日付を取得: Day
 * @param {string} date 日付
 * @return {Day} 日付文字列
 */
export function Day(date?: string): Day {
	// dateがnull or undefinedの場合、現在時刻を返す
	if (date === null || date === undefined) {
		return dayjs()
	}
	return dayjs(date)
}

/**
 * フォーマット込の日付を文字列で取得
 * @param {string} date 日付
 * @param {string} format フォーマット
 * @return {string} 日付文字列
 */
export function DayF(date?: string, format?: string): string {
	return Day(date).format(getFormat(format))
}

/**
 * フォーマット込の月初日を文字列で取得
 * @param {OpUnitType} unit 加算ユニット
 * @param {string} date 日付
 * @param {string} format フォーマット
 * @return {string} 日付文字列
 */
export function startOfF(unit?: OpUnitType, date?: string, format?: string): string {
	if (unit === null || unit === undefined) {
		return DayF(date, format)
	}

	return Day(date).startOf(unit).format(getFormat(format))
}

/**
 * フォーマット込の日付加算処理
 * @param {number} amount 加算量
 * @param {OpUnitType} unit 加算ユニット
 * @param {string} date 日付
 * @param {string} format フォーマット
 * @return {string} 日付文字列
 */
export function addF(amount?: number, unit?: OpUnitType, date?: string, format?: string): string {
	if (amount === null || amount === undefined || unit === null || unit === undefined) {
		return DayF(date, format)
	}

	return Day(date).add(amount, unit).format(getFormat(format))
}

/**
 * 日付用のフォーマット取得
 * @param {string} format フォーマット
 * @return {string} フォーマット
 */
function getFormat(format?: string): string {
	if (format === undefined || format === null) {
		return _defaultFormat
	}

	return format || _defaultFormat
}
