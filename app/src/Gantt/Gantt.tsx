import React from 'react'
import { Days, Day } from '../Date/Day'
import { Select } from './Select'
import './Gantt.css'

type GanttProps = Partial<{
	thisYear: string // 今年
	today: string // 当日の日付
}>

function Gantt(): JSX.Element {
	const props: GanttProps = {
		thisYear: Day(undefined, { format: 'YYYY' }),
		today: Day(undefined, { format: 'YYYY-MM-DD' }),
	}

	return (
		<>
			<nav id="navigation">
				<GanttHeader {...props} />
			</nav>
			<article id="gantt-main">
				<GanttTable {...props} />
			</article>
		</>
	)
}

/**
 * ガントチャートのヘッダー
 * @param props オプション
 */
function GanttHeader(props: GanttProps): JSX.Element {
	// 処理月
	const yearMonths = getMonths(props.thisYear)

	// テスト
	const option = {
		list: yearMonths,
	}

	return <Select {...option} />
}

/**
 * ガントチャートの本体
 * @param props オプション
 */
function GanttTable(props: GanttProps): JSX.Element {
	return (
		<table>
			<thead>{GanttTableHeader(props)}</thead>
			<tbody>{GanttTableBody(props)}</tbody>
			<tfoot></tfoot>
		</table>
	)
}

/**
 * ガントチャート、テーブル部分のヘッダー
 * @param props オプション
 */
function GanttTableHeader(props: GanttProps): JSX.Element {
	const rows = getDatesInMonth(props)
	return <tr key={0}>{rows}</tr>
}

/**
 * 1ヶ月分の日付を<td>の配列で取得
 * @param props オプション
 */
function getDatesInMonth(props: GanttProps): Array<JSX.Element> {
	// 一ヶ月分の日付
	const dates = Days(props.today, { format: 'DD (ddd)' })
	return dates.map((v, i) => {
		// 曜日判定
		let className = 'gantt-head'
		const dayOfWeek = getDayOfWeek(v)
		if (dayOfWeek) {
			className = className.concat(' ', dayOfWeek)
		}

		return (
			<td key={`head${i + 1}`} className={className}>
				{v}
			</td>
		)
	})
}

/**
 * 当該年の月リストを取得する
 * @param year 年 (e.g. 2020)
 * @return 月リスト
 */
function getMonths(year?: string): Array<string> {
	const months: Array<string> = []
	const format = { format: 'YYYY/MM' }
	months.push(Day('2021-01-01', format))
	return months
}

/**
 * 曜日を取得
 * @param date 日付
 * @return 曜日
 */
function getDayOfWeek(date: string): string {
	return getDayOfWeekString(date, 'Sat') || getDayOfWeekString(date, 'Sun')
}

/**
 * 日付が曜日に該当する場合、曜日を返却
 * @param date 日付
 * @param dayOfWeek 曜日
 * @return 曜日
 */
function getDayOfWeekString(date: string, dayOfWeek: string): string {
	return date.includes(dayOfWeek) ? dayOfWeek.toLowerCase() : ''
}

/**
 * ガントチャート、テーブル部分のボディ
 * @param props オプション
 */
function GanttTableBody(props: GanttProps) {
	return <tr></tr>
}

export default Gantt
