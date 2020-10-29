import React from 'react'
import { Days, Day } from '../Date/Day'
import { Select } from './Select'
import './Gantt.css'

type GanttProps = Partial<{
	option: string // 仮オプション
}>

function Gantt(props: GanttProps) {
	return <GanttTable {...props} />
}

function GanttTable(props: GanttProps) {
	return (
		<table>
			<thead>{GanttHead(props)}</thead>
			<tbody>{GanttBody(props)}</tbody>
			<tfoot></tfoot>
		</table>
	)
}

function GanttHead(props: GanttProps) {
	const rows = getDatesInMonth('2020-10-01')
	return <tr key={0}>{rows}</tr>
}

/**
 * 1ヶ月分の日付を<td>の配列で取得
 * @param date 日付
 */
function getDatesInMonth(date: string): Array<JSX.Element> {
	// 一ヶ月分の日付
	const dates = Days(date, { format: 'DD (ddd)' })
	const rows = dates.map((v, i) => {
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

	// 処理月
	//const month = Day(date, { format: 'MMM' })
	// テスト
	const props = {
		list: ['選択肢1', '選択肢2', '選択肢3'],
	}
	const month = <Select {...props} />
	return [<td key="head0">{month}</td>, ...rows]
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

function GanttBody(props: GanttProps) {
	return <tr></tr>
}

export default Gantt
