import React from 'react'
import { useState } from 'react'
import { Days, Day } from '../Date/Day'
import './Gantt.css'

type GanttProps = Partial<{
	thisYear: string // 今年
	yearMonth: string // 処理年月
}>

function Gantt(): JSX.Element {
	// 当日の日付で処理年月stateを初期化
	const today = Day(undefined, { format: 'YYYY-MM-DD' })
	const [yearMonth, useYearMonth] = useState(today)

	// props
	const props: GanttProps = {
		thisYear: Day(undefined, { format: 'YYYY' }),
		yearMonth: yearMonth,
	}

	// selecterのoption
	const options = GetMonthOptions(props)

	return (
		<>
			<nav id="navigation">
				<select value={yearMonth} onChange={(e) => useYearMonth(e.target.value)}>
					{options}
				</select>
			</nav>
			<article id="gantt-main">
				<GanttTable {...props} />
			</article>
		</>
	)
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
	const dates = Days(props.yearMonth, { format: 'DD (ddd)' })
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
 * 処理年月selecterのoptionを取得
 * @param props オプション
 */
function GetMonthOptions(props: GanttProps): Array<JSX.Element> {
	// 処理月
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	const yearMonths: Array<string> = []
	months.forEach((value) => {
		const month = `${value}`
		const yearMonth = `${props.thisYear}-${month.padStart(2, `0`)}-01`
		yearMonths.push(yearMonth)
	})

	return yearMonths.map((v, i) => {
		const label = Day(v, { format: 'YYYY/MM' })
		return (
			<option key={`${i}`} value={`${v}`} label={label}>
				{v}
			</option>
		)
	})
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
