import React from 'react'
import { Days, Day } from '../Date/Day'
import './Gantt.css'

function Gantt(props: Object) {
	return <GanttTable {...props} />
}

function GanttTable(props: Object) {
	return (
		<table>
			<thead>{GanttHead(props)}</thead>
			<tbody>{GanttBody(props)}</tbody>
			<tfoot></tfoot>
		</table>
	)
}

function GanttHead(props: Object) {
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
		return (
			<td key={`head${i + 1}`} className="gantt-head">
				{v}
			</td>
		)
	})

	// 処理月
	const month = Day(date, { format: 'MMM' })
	return [<td key="head0">{month}</td>, ...rows]
}

function GanttBody(props: Object) {
	return <tr></tr>
}

export default Gantt
