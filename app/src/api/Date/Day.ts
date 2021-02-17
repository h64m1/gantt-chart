import dayjs, { Dayjs } from 'dayjs'

const DEFAULT_FORMAT = 'YYYY-MM-DD'

type DayProps = Partial<{
	format: string // Date用のフォーマット
}>

/**
 * 指定された日付を含む、一ヶ月分の日付文字列を配列で取得
 * @param {string} date 日付文字列
 * @param {DayProps} props プロパティ
 * @return {Array} 日付文字列の配列
 */
export function Days(date: string, props?: DayProps): Array<string> {
	// 配列:当該月の日付分
	const daysInNumber = [...Array(dayjs(date).daysInMonth())].map((_, i) => i)
	// 月初日
	const firstDate = dayjs(date).startOf('month')
	// 日付文字列の配列
	return daysInNumber.map((_, i) => firstDate.add(i, 'day').format(getFormat(props)))
}

/**
 * 日付を指定されたフォーマットで取得
 * @param {string} date 日付
 * @param {DayProps} props プロパティ
 * @return {string} 日付文字列
 */
export function Day(date?: string, props?: DayProps): string {
	// propsが空の場合、default formatを設定
	const format = getFormat(props)
	return getDate(date, format)
}

/**
 * 日付を指定されたフォーマットで取得、加算したい月も指定
 * @param {number} amount 月
 * @param {string} date 日付
 * @param {DayProps} props プロパティ
 * @return {string} 日付文字列
 */
export function AddMonth(amount: number, date?: string, props?: DayProps): string {
	// propsが空の場合、default formatを設定
	const format = getFormat(props)
	const _day = date === null || date === undefined ? dayjs() : dayjs(date)
	return addMonth(_day, amount).format(format)
}

/**
 * 当日の日付を指定されたフォーマットで取得
 * @param {DayProps} props プロパティ
 * @return {string} 日付文字列
 */
export function Today(props?: DayProps): string {
	return Day(undefined, props)
}

/**
 * 月初日を取得
 * @param {string} date 日付
 * @param {DayProps} props プロパティ
 * @returns {string} 日付文字列
 */
export function YearMonth(date?: string, props?: DayProps): string {
	// dateがnull or undefinedの場合、現在時刻を返す
	let day = date
	const format = getFormat(props)
	if (date === null || date === undefined) {
		day = dayjs().format(format)
	}

	return dayjs(day).startOf('month').format(format)
}

/**
 * 当月の月初日を指定されたフォーマットで取得
 * @param {DayProps} props プロパティ
 * @return {string} 日付文字列
 */
export function ThisYearMonth(props?: DayProps): string {
	return YearMonth(Day(undefined, props), props)
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
 * @param {string} date 日付
 * @param {DayProps} format 日付用フォーマット
 * @returns {string} 日付文字列
 */
function getDate(date?: string, format?: string): string {
	// dateがnull or undefinedの場合、現在時刻を返す
	if (date === null || date === undefined) {
		return dayjs().format(format)
	}

	const day = dayjs(date)
	return day.format(format)
}

/**
 * 日付をを1月分加算、減算
 * @param {dayjs} day 日付
 * @param {number} amount 加算、減算する量
 */
function addMonth(day: Dayjs, amount: number) {
	const unit = 'month'
	return day.add(amount, unit)
}
